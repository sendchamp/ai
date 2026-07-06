# Sendchamp API Authentication

All Sendchamp Open API endpoints require authentication with your dashboard **access key**.

## Get your access key

1. Sign in at [my.sendchamp.com](https://my.sendchamp.com/login)
2. Go to **Settings → API Keys**
3. Copy your access key (starts with `sendchamp_live_` or `sendchamp_test_`)

## Usage

Pass the key as a Bearer token on every request:

```
Authorization: Bearer sendchamp_live_YOUR_ACCESS_KEY
Content-Type: application/json
```

## Base URL

```
https://api.sendchamp.com/api/v1
```

## Environment variables

Store the key in environment variables — never commit it to source control:

```bash
# .env
SENDCHAMP_ACCESS_KEY=sendchamp_live_YOUR_ACCESS_KEY
```

```javascript
// Node.js
const headers = {
  Authorization: `Bearer ${process.env.SENDCHAMP_ACCESS_KEY}`,
  "Content-Type": "application/json",
};
```

```python
# Python
import os
headers = {
    "Authorization": f"Bearer {os.environ['SENDCHAMP_ACCESS_KEY']}",
    "Content-Type": "application/json",
}
```

## Wallet balance

Before sending messages, check your balance:

```bash
curl -X GET https://api.sendchamp.com/api/v1/wallet-balance \
  -H "Authorization: Bearer $SENDCHAMP_ACCESS_KEY"
```

Insufficient balance returns a `400` with message `"Low balance, fund your wallet"` or `"insufficient fund"`.

## Rate limiting

Sendchamp applies rate limits per API key. Implement exponential backoff on `429` responses.

## Security

- Use separate keys for development and production
- Rotate keys if exposed
- Never log the full access key
- Perform OTP confirmation server-side only
