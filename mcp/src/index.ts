import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import type { IndexEntry } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function repoRoot(): string {
  const fromEnv = process.env.SENDCHAMP_AI_ROOT;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;
  // mcp/src -> repo root
  return path.resolve(__dirname, "../..");
}

function readFileOrEmpty(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

interface OpenApiSpec {
  paths?: Record<
    string,
    Record<
      string,
      {
        operationId?: string;
        summary?: string;
        description?: string;
        tags?: string[];
        requestBody?: unknown;
        responses?: unknown;
      }
    >
  >;
}

function indexOpenApi(root: string): IndexEntry[] {
  const specPath = path.join(root, "openapi", "sms-verification.yaml");
  const raw = readFileOrEmpty(specPath);
  if (!raw) return [];

  const spec = yaml.load(raw) as OpenApiSpec;
  const entries: IndexEntry[] = [];

  for (const [routePath, methods] of Object.entries(spec.paths ?? {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!operation?.operationId) continue;

      const id = `api:${operation.operationId}`;
      const title = operation.summary ?? operation.operationId;
      const description = (operation.description ?? "").trim();
      const tags = operation.tags ?? [];

      entries.push({
        id,
        source: "api",
        title: `${method.toUpperCase()} ${routePath} — ${title}`,
        summary: description.split("\n")[0] ?? title,
        tags: [...tags, method, routePath, "api", "sendchamp"],
        method: method.toUpperCase(),
        path: routePath,
        content: JSON.stringify(
          {
            operationId: operation.operationId,
            method: method.toUpperCase(),
            path: routePath,
            summary: operation.summary,
            description: operation.description,
            tags: operation.tags,
            requestBody: operation.requestBody,
            responses: operation.responses,
            server: "https://api.sendchamp.com/api/v1",
            auth: "Authorization: Bearer {access_key}",
          },
          null,
          2,
        ),
      });
    }
  }

  return entries;
}

function indexGuides(root: string): IndexEntry[] {
  const guidesDir = path.join(root, "guides");
  const entries: IndexEntry[] = [];

  const guideFiles: Record<string, { title: string; tags: string[] }> = {
    "auth-setup.md": {
      title: "Sendchamp API Authentication",
      tags: ["auth", "api key", "bearer", "setup"],
    },
    "sms-routes-africa.md": {
      title: "SMS Routes in Africa (DND, non_dnd, international)",
      tags: ["sms", "nigeria", "dnd", "routes", "compliance", "africa"],
    },
    "otp-flow.md": {
      title: "OTP Verification Flow",
      tags: ["otp", "verification", "2fa", "login", "confirm"],
    },
  };

  for (const [file, meta] of Object.entries(guideFiles)) {
    const content = readFileOrEmpty(path.join(guidesDir, file));
    if (!content) continue;

    const slug = file.replace(/\.md$/, "");
    entries.push({
      id: `guide:${slug}`,
      source: "guide",
      title: meta.title,
      summary: content.split("\n").find((l) => l.trim() && !l.startsWith("#"))?.trim() ?? meta.title,
      tags: [...meta.tags, "guide", "sendchamp"],
      content,
    });
  }

  return entries;
}

function indexLlmsTxt(): IndexEntry[] {
  const llmsEntries: Array<{ id: string; title: string; url: string; tags: string[] }> = [
    {
      id: "doc:llms-home",
      title: "Sendchamp llms.txt — AI crawler index",
      url: "https://sendchamp.com/llms.txt",
      tags: ["llms", "index", "docs"],
    },
    {
      id: "doc:docs-guides",
      title: "Sendchamp Developer Guides",
      url: "https://docs.sendchamp.com",
      tags: ["docs", "guides", "integration"],
    },
    {
      id: "doc:api-reference",
      title: "Sendchamp API Reference (ReadMe)",
      url: "https://sendchamp.readme.io",
      tags: ["api", "reference", "openapi"],
    },
    {
      id: "doc:simulator",
      title: "Sendchamp API Simulator",
      url: "https://simulator.sendchamp.com",
      tags: ["simulator", "testing", "playground"],
    },
    {
      id: "doc:github-ai",
      title: "Sendchamp AI GitHub Repository",
      url: "https://github.com/sendchamp/ai",
      tags: ["github", "skills", "mcp", "ai"],
    },
    {
      id: "doc:signup",
      title: "Sendchamp Sign Up",
      url: "https://my.sendchamp.com/signup",
      tags: ["signup", "account", "dashboard"],
    },
  ];

  return llmsEntries.map((e) => ({
    id: e.id,
    source: "docs" as const,
    title: e.title,
    summary: `External documentation: ${e.url}`,
    tags: e.tags,
    content: `# ${e.title}\n\nURL: ${e.url}\n\nPart of Sendchamp's AI-facing documentation index. See sendchamp.com/llms.txt for the full table of contents.`,
  }));
}

let cached: IndexEntry[] | null = null;

export function buildIndex(): IndexEntry[] {
  if (cached) return cached;
  const root = repoRoot();
  cached = [...indexOpenApi(root), ...indexGuides(root), ...indexLlmsTxt()];
  return cached;
}

export function getEntryById(id: string): IndexEntry | undefined {
  return buildIndex().find((e) => e.id === id);
}
