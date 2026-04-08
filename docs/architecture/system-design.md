# System Design Patterns and Architecture Reference

## Overview

This document covers the core architectural patterns and building blocks that appear repeatedly in system design interviews. Each section explains the pattern, when to use it, and key trade-offs.

## Layered Architecture

Most large-scale web systems follow a layered approach:

```
Clients (Web, Mobile, API consumers)
    |
    v
Load Balancer / CDN (Cloudflare, AWS CloudFront)
    |
    v
API Gateway / Web Servers (rate limiting, auth, routing)
    |
    v
Application Services (business logic, microservices)
    |
    v
Data Layer (databases, caches, message queues, object storage)
```

## Microservices vs Monolith

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deployment | Single artifact | Independent per service |
| Scaling | Scale entire app | Scale individual services |
| Data | Shared database | Database per service |
| Complexity | Simple to start | Operational overhead (service mesh, tracing) |
| Team autonomy | Low | High (Conway's Law) |

Start monolithic, extract microservices when specific scaling or team boundaries demand it.

## Data Partitioning (Sharding)

- **Horizontal sharding**: Split rows across databases by a shard key.
- **Shard key selection**: High cardinality, even distribution, aligned with query patterns. `user_id` is the most common.
- **Resharding**: Consistent hashing avoids full data migration when adding nodes.
- **Cross-shard queries**: Expensive -- design access patterns to stay within a single shard.

## Caching Architecture

```
Client --> CDN (static assets, edge caching)
        --> API Server --> Local Cache (in-process LRU)
                       --> Distributed Cache (Redis, Memcached)
                       --> Database
```

- **Cache-aside** (lazy loading): Read from cache, fallback to DB, populate cache on miss.
- **Write-through**: Write to cache and DB atomically.
- **TTL-based expiration**: Simple but risks serving stale data within the TTL window.
- **Cache invalidation**: The two hardest problems in CS -- use event-driven invalidation (CDC from DB) when consistency matters.

## Message Queues and Async Processing

Used to decouple services and absorb traffic spikes:
- **Point-to-point** (SQS): One consumer per message. Good for task queues.
- **Pub/sub** (SNS, Kafka topics): Multiple consumers. Good for event fanout.
- **Ordering**: Kafka partitions guarantee order within a partition. SQS FIFO queues provide strict ordering.
- **Dead-letter queues**: Catch messages that fail processing after N retries.

## Database Replication

- **Single-leader**: One primary accepts writes, replicates to read replicas. Simple, but write throughput limited to one node.
- **Multi-leader**: Multiple nodes accept writes. Used for multi-region deployments. Conflict resolution required.
- **Leaderless** (Dynamo-style): Any node accepts reads/writes. Quorum reads/writes (R + W > N) for consistency.

## Back-of-Envelope Estimation

Quick reference numbers:
- 1 day = 86,400 seconds (approximately 10^5)
- 1 million requests/day = approximately 12 QPS
- 1 billion requests/day = approximately 12,000 QPS
- 1 KB per record, 1 billion records = 1 TB
- SSD random read: 0.1ms, HDD: 10ms, Network round-trip same region: 0.5ms

## Example: Design a URL Shortener

1. **Functional requirements**: Shorten URL, redirect, analytics
2. **Non-functional**: 100M URLs/month write, 10B redirects/month read (100:1 ratio)
3. **Storage**: Key-value store (DynamoDB). 100M * 12 months * 1KB = 1.2TB/year
4. **Short code generation**: Base62 encode a 7-character code = 62^7 = 3.5 trillion unique codes
5. **Read path**: CDN for popular URLs, Redis cache for warm URLs, DynamoDB for cold reads
6. **Write path**: API server generates code, writes to DynamoDB, returns short URL
7. **Analytics**: Log redirects to Kafka, aggregate with Flink, store in ClickHouse
