# SMS Routes in Africa (Sendchamp)

Sendchamp routes control how SMS is delivered and which regulatory rules apply. Choosing the wrong route causes delivery failures or compliance issues — especially in Nigeria.

## Route values

| Route | Use for | Nigeria |
|-------|---------|---------|
| `non_dnd` | Transactional SMS, OTP, alerts, order updates | Default for OTP and notifications |
| `dnd` | Marketing/promotional SMS to DND-registered routes | Requires DND registration with NCC |
| `international` | Recipients outside Nigeria | Cross-border delivery |

## Decision guide

```
Is the message an OTP or transactional alert?
  → Yes: use non_dnd

Is it marketing/promotion to Nigerian numbers?
  → Yes: use dnd (ensure sender is DND-registered)

Is the recipient outside Nigeria?
  → Yes: use international
```

## Nigeria DND (Do Not Disturb)

Nigeria's NCC operates a DND registry. Promotional messages to numbers on the DND list are blocked unless sent via a registered promotional route.

- **OTP and transactional messages** → always `non_dnd`
- **Marketing campaigns** → `dnd` with an approved promotional sender
- Sending promo content on `non_dnd` may still deliver but violates regulatory intent

## Sender ID

Every SMS requires an approved `sender_name` (sender ID) registered on your Sendchamp account.

- Register sender IDs in the dashboard before going live
- Unapproved sender names cause send failures
- Max 11 characters for alphanumeric sender IDs in Nigeria

## Phone number format

All `to` numbers must be **E.164**:

| Country | Prefix | Example |
|---------|--------|---------|
| Nigeria | +234 | +2348012345678 |
| Kenya | +254 | +254712345678 |
| Ghana | +233 | +233241234567 |
| South Africa | +27 | +27821234567 |

## Message length and billing

| Encoding | Chars per segment | Notes |
|----------|-------------------|-------|
| GSM-7 (ASCII) | 160 | Standard Latin characters |
| Unicode (UTF-8) | 70 | Emojis, accented chars — costs more per segment |

Long messages are split into multiple segments; each segment is billed separately.

## Common errors

| Error | Cause | Fix |
|-------|-------|-----|
| Low balance | Wallet empty | Fund wallet or check `/wallet-balance` |
| Invalid sender | Sender not approved | Register sender in dashboard |
| Message failed to send | Wrong route or invalid number | Verify E.164 format and route |
| Insufficient fund | Balance too low for message cost | Top up wallet |

## Bulk SMS

Bulk sends use `POST /sms/send-bulk` with a `contact_list_id` and numeric `route_id` from the dashboard. Allowed route names for bulk: `dnd`, `non_dnd`, `international`.
