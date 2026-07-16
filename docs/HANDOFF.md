# Week 2 Handoff — Goodness / Itunu

## Production MCP deploy (Goodness)

Railway deploy was attempted but blocked (free-tier peak hours). Production needs:

1. Deploy `sendchamp/ai` using `mcp/Dockerfile` (see [`docs/deployment.md`](docs/deployment.md))
2. Set env: `PORT=3100`, `HOST=0.0.0.0`, `SENDCHAMP_AI_ROOT=/app`
3. Add custom domain: `mcp.sendchamp.com`
4. Verify: `curl https://mcp.sendchamp.com/health`

## docs.sendchamp.com pages (Itunu)

Publish these source files as live docs pages:

| Source in repo | Suggested URL |
|----------------|---------------|
| [`docs/agent-skills.md`](docs/agent-skills.md) | `docs.sendchamp.com/ai/agent-skills` |
| [`docs/mcp-server.md`](docs/mcp-server.md) | `docs.sendchamp.com/ai/mcp-server` |

## sendchamp.com/llms.txt (Itunu)

Replace live `llms.txt` with [`docs/llms.txt`](docs/llms.txt) — adds AI Tooling section with GitHub, Skills, and MCP links.

## Marketplace

- awesome-mcp-servers PR: https://github.com/punkpeye/awesome-mcp-servers/pull/9530
- Social copy: [`docs/marketplace-launch.md`](docs/marketplace-launch.md)

## skills.sh indexing

Skills install works via GitHub now:

```bash
npx skills add sendchamp/ai --skill sendchamp-sms-send-message --agent cursor
```

skills.sh search indexing may take 24–48h after first public push.

## GitHub

Repository live at: https://github.com/sendchamp/ai
