# Sendchamp MCP Server

The Sendchamp Model Context Protocol (MCP) server gives AI coding agents direct, structured access to Sendchamp documentation and API specifications — without leaving your IDE.

## What is MCP?

Model Context Protocol (MCP) is an open standard that lets AI applications connect to external tools and data. The Sendchamp docs MCP server is **read-only**: it helps agents find correct endpoints and parameters but does not execute API calls on your behalf.

## Endpoint

```
https://mcp.sendchamp.com/docs
```

Transport: Streamable HTTP  
Authentication: None required (public documentation only)

## Available tools

| Tool | Description |
|------|-------------|
| `sendchamp__search` | Search Sendchamp docs and API operations by natural language |
| `sendchamp__retrieve` | Get full parameter schemas or guide content for a specific ID |

## Setup

### Cursor

**Settings → MCP → Add server:**

```json
{
  "sendchamp-docs": {
    "url": "https://mcp.sendchamp.com/docs"
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

## Verify it's working

1. Confirm the MCP server appears in your IDE's MCP configuration
2. Ask: **"How do I send an SMS with Sendchamp in Nigeria?"**
3. Verify the agent invokes `sendchamp__search` and references specific endpoints

## Example prompts

- "How do I send OTP in Nigeria with Sendchamp?"
- "What Sendchamp route should I use for transactional SMS?"
- "Show me the parameters for POST /verification/confirm"
- "How do I authenticate with the Sendchamp API?"

## Pair with Agent Skills

MCP provides schema discovery. For implementation patterns with Africa compliance baked in, install Agent Skills:

```bash
npx skills add sendchamp/ai --skill sendchamp-sms-send-message --agent cursor
npx skills add sendchamp/ai --skill sendchamp-verify-send-otp --agent cursor
```

See [Agent Skills](agent-skills.md).

## Local development

```bash
git clone https://github.com/sendchamp/ai.git
cd ai/mcp && npm install && npm run dev
```

Point Cursor at `http://localhost:3100/docs`.

## Feedback

Report issues: [github.com/sendchamp/ai/issues](https://github.com/sendchamp/ai/issues)

## Source

MCP server code: [github.com/sendchamp/ai/tree/main/mcp](https://github.com/sendchamp/ai/tree/main/mcp)
