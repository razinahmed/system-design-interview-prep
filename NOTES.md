# System Design Interview Study Notes

## CAP Theorem

- **Consistency**: Every read returns the most recent write or an error.
- **Availability**: Every request receives a non-error response, but the data may not be the most recent.
- **Partition Tolerance**: The system continues to operate despite network partitions between nodes.
- In practice, network partitions are inevitable, so the real trade-off is between C and A during a partition event.
- CP systems (e.g., HBase, MongoDB with majority read concern) sacrifice availability during partitions.
- AP systems (e.g., Cassandra, DynamoDB) sacrifice consistency, relying on eventual consistency.

## Consistent Hashing

- Maps both servers and keys onto a hash ring. Each key is assigned to the first server clockwise from its position.
- Adding/removing a server only affects a small fraction of keys (K/N on average).
- Virtual nodes improve load distribution by placing multiple points per physical server on the ring.
- Used by: DynamoDB, Cassandra, Akamai CDN, Discord.

## Database Scaling

- **Vertical scaling**: Bigger machine. Simple but limited by hardware ceiling.
- **Read replicas**: Route reads to replicas, writes to primary. Introduces replication lag.
- **Sharding**: Partition data across multiple databases by a shard key (user_id, geography, etc.).
  - Range-based sharding: simple but can create hotspots.
  - Hash-based sharding: even distribution but loses range query ability.
- **Connection pooling**: PgBouncer, ProxySQL -- essential for serverless architectures where each invocation opens a new connection.

## Rate Limiting

- **Token bucket**: Fixed-capacity bucket, refilled at a steady rate. Allows short bursts.
- **Sliding window log**: Track timestamps of each request. Precise but memory-intensive.
- **Sliding window counter**: Hybrid -- uses fixed windows with weighted overlap. Used by Redis-based rate limiters.
- Implementation layers: API gateway (AWS API Gateway, Kong), application middleware, distributed (Redis + Lua script).

## Message Queues and Event Streaming

- **Message queues** (SQS, RabbitMQ): point-to-point delivery, at-least-once semantics, consumer acknowledges after processing.
- **Event streaming** (Kafka, Kinesis): append-only log, multiple consumer groups can read independently, data retained for a configurable period.
- Key design questions: ordering guarantees, exactly-once delivery, dead-letter queues, backpressure handling.

## Load Balancing

- **L4 (Transport)**: Routes TCP/UDP connections. Fast, no request inspection. (AWS NLB)
- **L7 (Application)**: Routes HTTP requests based on path, headers, cookies. Supports sticky sessions. (AWS ALB, Nginx)
- Algorithms: round-robin, least connections, weighted, IP hash, consistent hashing.
- Health checks: active (periodic ping) vs. passive (track error rates).

## Caching Strategies

- **Cache-aside**: Application checks cache first, loads from DB on miss, writes to cache. Most common.
- **Write-through**: Application writes to cache and DB simultaneously. Consistent but higher write latency.
- **Write-behind**: Write to cache, asynchronously flush to DB. Low latency but risk of data loss.
- **Eviction policies**: LRU (most common), LFU, TTL-based.
- **Cache stampede prevention**: Locking, probabilistic early recomputation, stale-while-revalidate.

## URL Shortener Design

1. API: `POST /shorten` takes long URL, returns short code. `GET /:code` redirects.
2. ID generation: Base62 encode an auto-increment ID, or use a pre-generated key pool.
3. Storage: Key-value store (DynamoDB, Redis) for code-to-URL mapping.
4. Scale: Read-heavy (100:1 read:write). Cache popular URLs in Redis. CDN for redirect responses.
5. Analytics: Log redirects to Kafka, process with Flink for real-time click counts.

## Common Interview Patterns

- Always start with requirements clarification (functional + non-functional).
- Estimate scale: QPS, storage, bandwidth. Use back-of-envelope math.
- Start with a simple design, then iterate to handle scale.
- Discuss trade-offs explicitly -- interviewers want to see you think through alternatives.
- Address single points of failure, data durability, and monitoring.
