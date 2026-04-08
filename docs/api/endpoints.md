# System Design Reference APIs

This document catalogs the API patterns commonly discussed in system design interviews, with example endpoint definitions.

## URL Shortener API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/shorten` | POST | Create a short URL from a long URL |
| `/api/v1/{shortCode}` | GET | Redirect to the original URL (HTTP 301/302) |
| `/api/v1/stats/{shortCode}` | GET | Return click analytics for a short URL |

**POST /api/v1/shorten request:**
```json
{ "url": "https://example.com/very/long/path", "customAlias": "my-link", "expiresAt": "2026-01-01T00:00:00Z" }
```

**POST /api/v1/shorten response:**
```json
{ "shortUrl": "https://short.ly/abc123", "expiresAt": "2026-01-01T00:00:00Z" }
```

## Chat / Messaging API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/messages` | POST | Send a message to a conversation |
| `/api/v1/conversations/:id/messages` | GET | Fetch paginated message history |
| `/ws/v1/connect` | WebSocket | Real-time message delivery |

## Notification Service API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/notifications/send` | POST | Dispatch a notification (push, email, SMS) |
| `/api/v1/notifications` | GET | List notifications for the authenticated user |
| `/api/v1/notifications/:id/read` | PUT | Mark a notification as read |

## Rate Limiter API (internal)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/ratelimit/check` | POST | Check if a request is allowed for a given client key |
| `/api/v1/ratelimit/config` | GET | Return current rate limit configuration |

**POST /api/v1/ratelimit/check request:**
```json
{ "clientKey": "user:12345", "resource": "/api/shorten", "weight": 1 }
```

**Response:**
```json
{ "allowed": true, "remaining": 47, "resetAt": "2025-06-01T12:01:00Z" }
```

## Common Patterns

- All APIs use JSON request/response bodies
- Authentication via `Authorization: Bearer <JWT>` header
- Pagination via `?cursor=<token>&limit=<n>` query parameters
- Rate limiting via `X-RateLimit-Remaining` and `Retry-After` response headers
- Idempotency keys via `Idempotency-Key` request header for POST endpoints
