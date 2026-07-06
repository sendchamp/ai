# Sendchamp Agent Skills

Agent Skills teach AI coding assistants how to integrate Sendchamp correctly — with Africa-specific routing, compliance, and OTP patterns that global competitors don't encode.

Install via the [Skills CLI](https://github.com/vercel-labs/skills):

```bash
# Install all Sendchamp skills
npx skills add sendchamp/ai --agent cursor

# Install a specific skill
npx skills add sendchamp/ai --skill sendchamp-sms-send-message --agent cursor
npx skills add sendchamp/ai --skill sendchamp-verify-send-otp --agent cursor
```

Browse on [skills.sh](https://skills.sh).

## Available skills (Week 2)

| Skill | Description |
|-------|-------------|
| [`sendchamp-sms-send-message`](sendchamp/sendchamp-sms-send-message/) | Send transactional SMS with correct Nigerian routes (`dnd`, `non_dnd`, `international`) |
| [`sendchamp-verify-send-otp`](sendchamp/sendchamp-verify-send-otp/) | Send and confirm OTPs via SMS, email, WhatsApp, or voice |

## Roadmap (v2)

| Skill | Priority | Status |
|-------|----------|--------|
| `sendchamp-api-auth-setup` | P1 | Planned |
| `sendchamp-africa-sms-compliance` | P1 | Planned |
| `sendchamp-whatsapp-send-message` | P2 | Planned |
| `sendchamp-voice-send` | P2 | Planned |

## Skill structure

Each skill is a directory with a `SKILL.md` file (YAML frontmatter + markdown instructions). Optional `references/` files hold detailed docs loaded on demand.

```
skills/sendchamp/<skill-name>/
├── SKILL.md
└── references/
    └── ...
```

## Authoring

Follow the [Agent Skills open standard](https://agentskills.io). Validate before publishing:

```bash
npx skills-ref validate ./skills/sendchamp/sendchamp-sms-send-message
```
