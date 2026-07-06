# Sendchamp Docs MCP Server

Read-only Model Context Protocol server giving AI coding agents semantic search over Sendchamp documentation and API specifications.

**Endpoint:** `https://mcp.sendchamp.com/docs`  
**Transport:** Streamable HTTP (no authentication required)

## Tools

| Tool | Description |
|------|-------------|
| `sendchamp__search` | Search docs and API operations by natural language query |
| `sendchamp__retrieve` | Fetch full schemas or guide content by ID from search results |

## Setup by IDE

### Cursor

Add in **Settings → MCP**:

```json
{
  "sendchamp-docs": {
    "url": "https://mcp.sendchamp.com/docs"
  }
}
```

For local development:

```json
{
  "sendchamp-docs": {
    "url": "http://localhost:3100/docs"
  }
}
```

### Claude Code

```bash
claude mcp add sendchamp-docs --transport http --url https://mcp.sendchamp.com/docs
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "sendchamp-docs": {
      "url": "https://mcp.sendchamp.com/docs"
    }
  }
}
```

### Codex (OpenAI)

```bash
codex mcp add sendchamp-docs --url https://mcp.sendchamp.com/docs
```

## Local development

```bash
cd mcp
npm install
npm run dev
```

Health check: `curl http://localhost:3100/health`

## Example usage

Once connected, ask your agent:

- "How do I send an SMS in Nigeria with Sendchamp?"
- "What route should I use for OTP messages?"
- "Show me the parameters for POST /verification/send"

The agent should call `sendchamp__search`, then `sendchamp__retrieve` for full schemas.

## Deployment

See [`docs/deployment.md`](../docs/deployment.md) for Railway/Docker deployment to `mcp.sendchamp.com`.

```bash
# From repo root
docker build -f mcp/Dockerfile -t sendchamp-mcp-docs .
docker run -p 3100:3100 sendchamp-mcp-docs
```

## Indexed content

- `openapi/sms-verification.yaml` — SMS, verification, wallet API schemas
- `guides/` — auth setup, Africa SMS routes, OTP flow
- `sendchamp.com/llms.txt` links — external doc references

## Feedback

Open issues at [github.com/sendchamp/ai/issues](https://github.com/sendchamp/ai/issues).
