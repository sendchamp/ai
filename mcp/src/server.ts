import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { getEntryById } from "./index.js";
import { searchEntries } from "./search.js";

const PORT = parseInt(process.env.PORT ?? "3100", 10);
const HOST = process.env.HOST ?? "0.0.0.0";

// Stateful session transports for Streamable HTTP
const transports = new Map<string, StreamableHTTPServerTransport>();

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "sendchamp-docs",
    version: "0.1.0",
  });

  server.tool(
    "sendchamp__search",
    "Search Sendchamp documentation and API operations by natural language query. Use source='docs' for conceptual guides, source='api' for API endpoints, source='guide' for curated integration guides, or source='all' (default) when unsure. Returns ranked results with IDs for sendchamp__retrieve.",
    {
      query: z.string().describe("Natural language search query"),
      source: z
        .enum(["api", "docs", "guide", "all"])
        .optional()
        .describe("Filter by content type (default: all)"),
      limit: z.number().int().min(1).max(20).optional().describe("Max results (default: 8)"),
    },
    async ({ query, source, limit }) => {
      const results = searchEntries({
        query,
        source: source ?? "all",
        limit: limit ?? 8,
      });

      const text =
        results.length === 0
          ? "No results found. Try broader terms like 'send SMS Nigeria', 'OTP verification', or 'API authentication'."
          : results
              .map(
                (r, i) =>
                  `${i + 1}. [${r.id}] (${r.source}) ${r.title}\n   ${r.snippet}`,
              )
              .join("\n\n");

      return {
        content: [{ type: "text" as const, text }],
      };
    },
  );

  server.tool(
    "sendchamp__retrieve",
    "Fetch full documentation or API schema for a specific ID returned by sendchamp__search. Returns complete parameter schemas, guides, or doc links.",
    {
      id: z.string().describe("Document or API operation ID from search results (e.g. api:sendSms, guide:otp-flow)"),
    },
    async ({ id }) => {
      const entry = getEntryById(id);
      if (!entry) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Unknown ID: ${id}. Use sendchamp__search first to find valid IDs.`,
            },
          ],
          isError: true,
        };
      }

      const header = `# ${entry.title}\n\nID: ${entry.id}\nSource: ${entry.source}\n\n`;
      return {
        content: [{ type: "text" as const, text: header + entry.content }],
      };
    },
  );

  return server;
}

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "sendchamp-docs-mcp", version: "0.1.0" });
});

const handleMcpPost = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  try {
    if (sessionId && transports.has(sessionId)) {
      const transport = transports.get(sessionId)!;
      await transport.handleRequest(req, res, req.body);
      return;
    }

    if (!sessionId && isInitializeRequest(req.body)) {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (id) => {
          transports.set(id, transport);
        },
      });

      transport.onclose = () => {
        const sid = transport.sessionId;
        if (sid) transports.delete(sid);
      };

      const server = createMcpServer();
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      return;
    }

    res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "Bad Request: invalid session or not an initialize request" },
      id: null,
    });
  } catch (err) {
    console.error("MCP error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
};

const handleMcpGetDelete = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports.has(sessionId)) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }
  const transport = transports.get(sessionId)!;
  await transport.handleRequest(req, res);
};

// Primary endpoint (Twilio-style): https://mcp.sendchamp.com/docs
app.post("/docs", handleMcpPost);
app.get("/docs", handleMcpGetDelete);
app.delete("/docs", handleMcpGetDelete);

// Alias for local dev
app.post("/mcp", handleMcpPost);
app.get("/mcp", handleMcpGetDelete);
app.delete("/mcp", handleMcpGetDelete);

app.listen(PORT, HOST, () => {
  console.log(`Sendchamp docs MCP listening on http://${HOST}:${PORT}/mcp`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
});
