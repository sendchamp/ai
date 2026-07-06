# Agent Skills for AI Coding Assistants

Sendchamp Agent Skills teach AI coding assistants (Cursor, Claude Code, Codex, Windsurf) how to integrate Sendchamp correctly — with Africa-specific SMS routing, DND compliance, and OTP patterns.

## What are Agent Skills?

Agent Skills are reusable instruction files (`SKILL.md`) that extend your coding agent's capabilities. When you ask about Sendchamp integration, the agent loads the skill and generates accurate, production-ready code instead of hallucinating endpoints.

## Install

Install via the [Skills CLI](https://github.com/vercel-labs/skills):

```bash
# Install SMS skill
npx skills add sendchamp/ai --skill sendchamp-sms-send-message --agent cursor

# Install OTP skill
npx skills add sendchamp/ai --skill sendchamp-verify-send-otp --agent cursor

# Install both
npx skills add sendchamp/ai --agent cursor
```

Browse on [skills.sh](https://skills.sh).

## Available skills

| Skill | Use when |
|-------|----------|
| `sendchamp-sms-send-message` | Sending transactional SMS, order notifications, or bulk SMS in Nigeria, Kenya, Ghana |
| `sendchamp-verify-send-otp` | Phone login, 2FA, OTP verification via SMS, email, WhatsApp, or voice |

## Example prompts

After installing skills, try:

- "How do I send an OTP in Nigeria with Sendchamp?"
- "Integrate Sendchamp SMS into my Next.js app"
- "Build phone verification with Sendchamp for a fintech app"

## Authentication

All Sendchamp API calls require your dashboard access key:

```
Authorization: Bearer sendchamp_live_YOUR_ACCESS_KEY
```

Get your key from [my.sendchamp.com](https://my.sendchamp.com) → Settings → API Keys.

Base URL: `https://api.sendchamp.com/api/v1`

## Pair with MCP

For live API schema search, also connect the Sendchamp docs MCP server. See [MCP Server Setup](mcp-server.md).

## Source

Skills source code: [github.com/sendchamp/ai](https://github.com/sendchamp/ai)
