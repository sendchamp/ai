# Marketplace Listings & Launch Copy

## awesome-mcp-servers PR

Add under **Communication** or **Documentation** section:

```markdown
- [Sendchamp Docs MCP](https://github.com/sendchamp/ai/tree/main/mcp) - Read-only MCP server for Sendchamp SMS and OTP verification API documentation. Search African messaging endpoints, DND routes, and verification schemas. Endpoint: `https://mcp.sendchamp.com/docs`
```

PR target: https://github.com/punkpeye/awesome-mcp-servers

## modelcontextprotocol/servers

Submit entry if eligible per their CONTRIBUTING.md with:
- Name: sendchamp-docs
- URL: https://mcp.sendchamp.com/docs
- Repo: https://github.com/sendchamp/ai

## Social launch copy

### Twitter/X thread

**Tweet 1:**
We just shipped official AI tooling for Sendchamp — the first African messaging platform with Agent Skills + a docs MCP server.

Install in one command:
```
npx skills add sendchamp/ai --agent cursor
```

**Tweet 2:**
Two skills launch today:
• sendchamp-sms-send-message — Nigeria DND routes baked in
• sendchamp-verify-send-otp — SMS, WhatsApp, email, voice OTP

No more hallucinated endpoints.

**Tweet 3:**
Docs MCP (read-only) for Cursor, Claude Code, Windsurf:
```
https://mcp.sendchamp.com/docs
```

Ask your agent: "How do I send OTP in Nigeria with Sendchamp?"

GitHub: github.com/sendchamp/ai

### Community forum post (community.sendchamp.com)

**Title:** Official Sendchamp Agent Skills & MCP Server for AI Coding Assistants

**Body:**
We've published our official AI tooling repo at github.com/sendchamp/ai.

What's included:
- Agent Skills for SMS and OTP integration (Africa compliance built in)
- Read-only docs MCP server for API search in Cursor/Claude Code
- OpenAPI spec for SMS + Verification endpoints

Install skills:
```
npx skills add sendchamp/ai --skill sendchamp-sms-send-message --agent cursor
npx skills add sendchamp/ai --skill sendchamp-verify-send-otp --agent cursor
```

Connect MCP in Cursor Settings:
```json
{ "sendchamp-docs": { "url": "https://mcp.sendchamp.com/docs" } }
```

Docs: docs.sendchamp.com/ai/agent-skills

## Metrics to track post-launch

- `npx skills find sendchamp` discovery
- MCP health check uptime at `/health`
- GitHub stars on sendchamp/ai
- AI visibility re-test (10 prompts × 4 engines)
