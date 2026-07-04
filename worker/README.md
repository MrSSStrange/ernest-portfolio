# AI Assistant Worker

Cloudflare Worker for the portfolio `/ask` API.

Security behavior:

- allows CORS only from `https://ernestmuzafarov.tech`;
- limits `/ask` to 10 requests per minute per IP with a Durable Object binding;
- returns `Retry-After` when rate limited;
- blocks prompt injection and XSS-like inputs before calling Workers AI;
- checks model output for leaked prompt fragments;
- never returns stack traces, OpenAI/Workers AI details, raw responses or file paths.

Local guard tests:

```bash
node worker/test-guards.mjs
```

Deploy from this directory with Wrangler after authenticating Cloudflare:

```bash
cd worker
wrangler deploy
```
