# OTP Confirm Flow

Full guide: [otp-flow.md](../../../guides/otp-flow.md)

## Server-side flow

1. `POST /verification/send` → save `reference` (not `token`)
2. User submits code in your UI
3. `POST /verification/confirm` with `verification_code` + `verification_reference`
4. Check `data.status === "verified"`

## Confirm request

```json
{
  "verification_code": "482910",
  "verification_reference": "MN-OTP-abc123"
}
```

## Status after confirm

| status | Action |
|--------|--------|
| `verified` | Grant access |
| `expired` | Send new OTP |
| (error) invalid token | Let user retry |

## Security

- Never expose `token` from send response to client
- Rate-limit confirm attempts
- Store reference server-side only
