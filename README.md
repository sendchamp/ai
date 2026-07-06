# Sendchamp AI

The official one-stop shop for AI agents and developers building with [Sendchamp](https://www.sendchamp.com) — Africa's cloud communications platform for SMS, OTP verification, WhatsApp, Voice, and Email.

## What's here

| Directory | Purpose |
|-----------|---------|
| [`skills/`](skills/) | Agent Skills for Cursor, Claude Code, Codex, and other AI coding assistants |
| [`mcp/`](mcp/) | Read-only docs MCP server (`sendchamp__search`, `sendchamp__retrieve`) |
| [`openapi/`](openapi/) | OpenAPI spec for SMS and verification endpoints |
| [`guides/`](guides/) | Curated integration guides indexed by the MCP server |
| [`docs/`](docs/) | Documentation source for docs.sendchamp.com (Agent Skills + MCP setup) |

## Quick start

### Agent Skills

```bash
npx skills add sendchamp/ai --skill sendchamp-sms-send-message --agent cursor
npx skills add sendchamp/ai --skill sendchamp-verify-send-otp --agent cursor
```

### MCP (docs search)

Add to Cursor **Settings → MCP**:

```json
{
  "sendchamp-docs": {
    "url": "https://mcp.sendchamp.com/docs"
  }
}
```

For local development:

```bash
cd mcp && npm install && npm run dev
```

Then point Cursor at `http://localhost:3100/mcp`.

See [`mcp/README.md`](mcp/README.md) and [`docs/mcp-server.md`](docs/mcp-server.md) for full setup across IDEs.

## Week 2 skills

| Skill | Use when |
|-------|----------|
| `sendchamp-sms-send-message` | Sending transactional or bulk SMS in Nigeria, Kenya, Ghana, and other African markets |
| `sendchamp-verify-send-otp` | OTP login, phone verification, or two-factor auth via SMS, email, WhatsApp, or voice |

## API authentication

All Sendchamp API calls use your dashboard access key:

```
Authorization: Bearer YOUR_ACCESS_KEY
```

Get your key from [my.sendchamp.com](https://my.sendchamp.com) → Settings → API Keys.

Base URL: `https://api.sendchamp.com/api/v1`

## Links

- [Sendchamp Docs](https://docs.sendchamp.com)
- [API Reference](https://sendchamp.readme.io)
- [llms.txt](https://sendchamp.com/llms.txt)
- [API Simulator](https://simulator.sendchamp.com)

## License

[MIT](LICENSE)
