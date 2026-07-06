# SMS Routes in Africa

See the full guide: [sms-routes-africa.md](../../../guides/sms-routes-africa.md)

## Quick reference

| Route | When to use |
|-------|-------------|
| `non_dnd` | OTP, alerts, order updates, transactional |
| `dnd` | Nigerian marketing/promo (DND-registered) |
| `international` | Recipients outside Nigeria |

## E.164 examples

- Nigeria: `+2348012345678`
- Kenya: `+254712345678`
- Ghana: `+233241234567`

## Sender ID rules

- Must be pre-approved in Sendchamp dashboard
- Max 11 chars for alphanumeric IDs in Nigeria
- Use the exact registered name in `sender_name`

## Billing segments

- GSM-7: 160 characters per segment
- Unicode: 70 characters per segment (emojis count as Unicode)
