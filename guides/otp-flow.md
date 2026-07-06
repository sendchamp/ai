# OTP Verification Flow (Sendchamp)

Sendchamp Verification API handles OTP generation, delivery, and confirmation across SMS, email, WhatsApp, and voice.

## Flow overview

```
1. POST /verification/send     → delivers OTP, returns reference
2. User enters code in your app
3. POST /verification/confirm  → validates code against reference
4. On success: status = "verified" → grant access
```

Always perform step 3 **server-side**. Never trust client-only validation.

## Send OTP

```bash
curl -X POST https://api.sendchamp.com/api/v1/verification/send \
  -H "Authorization: Bearer $SENDCHAMP_ACCESS_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "sms",
    "customer_mobile_number": "+2348012345678",
    "sender": "MyBrand",
    "token_type": "numeric",
    "token_length": 6,
    "expiration_time": 10
  }'
```

**Response fields to save server-side:**

| Field | Purpose |
|-------|---------|
| `reference` | Required for `/verification/confirm` (e.g. `MN-OTP-...`) |
| `status` | Delivery status |

## Confirm OTP

```bash
curl -X POST https://api.sendchamp.com/api/v1/verification/confirm \
  -H "Authorization: Bearer $SENDCHAMP_ACCESS_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "verification_code": "482910",
    "verification_reference": "MN-OTP-abc123"
  }'
```

Success: `data.status` = `"verified"`.

## Channels

| Channel | `channel` value | Required field |
|---------|----------------|----------------|
| SMS | `sms` | `customer_mobile_number`, `sender` |
| Email | `email` | `customer_email_address` |
| WhatsApp | `whatsapp` | `customer_mobile_number`, `sender` |
| Voice | `voice` | `customer_mobile_number` |

## Token configuration

| Field | Values | Default |
|-------|--------|---------|
| `token_type` | `numeric`, `alphanumeric` | — |
| `token_length` | 4–10 | 6 |
| `expiration_time` | minutes | 10 |

## Status values

| Status | Meaning |
|--------|---------|
| `processing` | OTP sent, awaiting confirmation |
| `verified` | Code confirmed successfully |
| `expired` | OTP past expiration_time |
| `low_fund` | Send failed due to insufficient balance |

## Error handling

| API message | Meaning | Action |
|-------------|---------|--------|
| `invalid token` | Wrong code or reference | Ask user to retry |
| `this otp has expired` | Past expiration_time | Send a new OTP |
| `this otp has already been used` | Code already confirmed | Do not retry same code |
| `Low balance, fund your wallet` | Insufficient funds | Top up wallet |

## Security

- **Do not** return the OTP `token` from your backend to the client app
- **Do not** log verification codes or references in plain text
- Store `reference` in server session or database keyed to the user
- Rate-limit confirm attempts per user/IP
- The send response may include `token` for testing — disable in production flows

## WhatsApp note

WhatsApp OTP delivery uses Flutterwave infrastructure. Failures may return `"Unable to send verification code via WhatsApp"`. Fall back to SMS channel if WhatsApp fails.

## End-to-end server pattern (Node.js)

```javascript
// 1. Send
const sendRes = await fetch("https://api.sendchamp.com/api/v1/verification/send", {
  method: "POST",
  headers: authHeaders,
  body: JSON.stringify({
    channel: "sms",
    customer_mobile_number: phone,
    sender: "MyBrand",
    token_type: "numeric",
    token_length: 6,
    expiration_time: 10,
  }),
});
const { data } = await sendRes.json();
// Store data.reference in session/DB — NOT data.token

// 2. Confirm (when user submits code)
const confirmRes = await fetch("https://api.sendchamp.com/api/v1/verification/confirm", {
  method: "POST",
  headers: authHeaders,
  body: JSON.stringify({
    verification_code: userSubmittedCode,
    verification_reference: storedReference,
  }),
});
const confirm = await confirmRes.json();
if (confirm.data?.status === "verified") {
  // Grant access
}
```
