# Deployment — Sendchamp Docs MCP

Deploy the read-only docs MCP server to `mcp.sendchamp.com`.

## Railway (recommended)

1. Create a new Railway service linked to `github.com/sendchamp/ai`
2. Set **Root Directory** to repo root
3. Use **Dockerfile path**: `mcp/Dockerfile`
4. Set environment variables:
   - `PORT=3100`
   - `HOST=0.0.0.0`
   - `SENDCHAMP_AI_ROOT=/app`
5. Add custom domain: `mcp.sendchamp.com`
6. Verify: `curl https://mcp.sendchamp.com/health`

## Docker

From repo root:

```bash
docker build -f mcp/Dockerfile -t sendchamp-mcp-docs .
docker run -p 3100:3100 -e SENDCHAMP_AI_ROOT=/app sendchamp-mcp-docs
curl http://localhost:3100/health
```

## DNS

| Record | Value |
|--------|-------|
| `mcp.sendchamp.com` | Railway/hosting CNAME or A record |

**Owner:** Goodness (DNS + production deploy)  
**Support:** Uko (Dockerfile, health check, env config)

## Post-deploy checklist

- [ ] `GET /health` returns `{"status":"ok"}`
- [ ] Cursor connects to `https://mcp.sendchamp.com/docs`
- [ ] `sendchamp__search` returns SMS/OTP results
- [ ] Update docs.sendchamp.com MCP page with live URL
- [ ] Update sendchamp.com/llms.txt

## Monitoring

- Health endpoint: `/health`
- Logs: Railway dashboard or container stdout
- No API keys stored — read-only server
