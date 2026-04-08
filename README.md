<div align="center">

<img src="https://placehold.co/900x200/0a0a23/a78bfa.png?text=System+Design+Interview+Prep&font=Montserrat" alt="System Design Interview Prep Banner" width="100%" />

# System Design Interview Prep

**Comprehensive FAANG system design interview notes — load balancers, databases, caching, message queues, CDNs, and real-world architecture case studies with diagrams.**

[![System Design](https://img.shields.io/badge/System_Design-FF6B6B?style=for-the-badge&logo=bookstack&logoColor=white)](https://github.com/razinahmed/system-design-interview-prep)
[![Architecture](https://img.shields.io/badge/Architecture-4A90D9?style=for-the-badge&logo=diagrams.net&logoColor=white)](https://github.com/razinahmed/system-design-interview-prep)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://github.com/razinahmed/system-design-interview-prep)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

[Features](#-features) · [Topics Covered](#-topics-covered) · [Case Studies](#-case-studies) · [Getting Started](#-getting-started) · [Contributing](#-contributing)

</div>

---

## :sparkles: Features

| Feature | Description |
|---|---|
| :balance_scale: **Load Balancer Patterns** | L4/L7 load balancing, round-robin, least connections, consistent hashing |
| :floppy_disk: **Database Sharding & Replication** | Horizontal/vertical sharding, master-slave replication, read replicas |
| :zap: **Caching Strategies** | Redis, Memcached, write-through, write-back, cache-aside, eviction policies |
| :mailbox_with_mail: **Message Queues** | Kafka, RabbitMQ, SQS — pub/sub, event sourcing, dead letter queues |
| :globe_with_meridians: **CDN Architecture** | Edge caching, origin shields, cache invalidation, geo-routing |
| :jigsaw: **Microservices Patterns** | Service mesh, API gateway, circuit breaker, saga pattern, CQRS |
| :triangular_ruler: **CAP Theorem** | Consistency, availability, partition tolerance trade-offs with examples |
| :no_entry_sign: **Rate Limiting** | Token bucket, sliding window, distributed rate limiting strategies |

---

## :dart: Topics Covered

### Case Studies

| # | System | Key Concepts | Difficulty |
|---|---|---|---|
| 1 | :link: **Design URL Shortener** | Hashing, Base62 encoding, read-heavy scaling, analytics | Medium |
| 2 | :bird: **Design Twitter** | Fan-out, timeline generation, celebrity problem, real-time feeds | Hard |
| 3 | :movie_camera: **Design Netflix** | Video transcoding, adaptive bitrate, CDN, recommendation engine | Hard |
| 4 | :speech_balloon: **Design Chat System** | WebSocket, message queue, presence service, E2E encryption | Hard |
| 5 | :credit_card: **Design Payment System** | Idempotency, distributed transactions, ledger, reconciliation | Hard |

### Foundational Concepts

| Topic | Contents |
|---|---|
| **Networking** | DNS, TCP/UDP, HTTP/2, gRPC, WebSocket protocols |
| **Storage** | SQL vs NoSQL, ACID, BASE, LSM trees, B-trees |
| **Compute** | Horizontal vs vertical scaling, auto-scaling, serverless |
| **Security** | OAuth 2.0, JWT, API keys, encryption at rest/transit |
| **Monitoring** | Distributed tracing, metrics, alerting, SLAs/SLOs |
| **Data** | Data partitioning, consistent hashing, bloom filters |

---

## :open_file_folder: Project Structure

```
system-design-interview-prep/
├── fundamentals/
│   ├── 01-networking.md
│   ├── 02-databases.md
│   ├── 03-caching.md
│   ├── 04-load-balancing.md
│   ├── 05-message-queues.md
│   ├── 06-cdn.md
│   ├── 07-cap-theorem.md
│   └── 08-rate-limiting.md
├── case-studies/
│   ├── url-shortener/
│   │   ├── README.md
│   │   └── diagrams/
│   ├── twitter/
│   ├── netflix/
│   ├── chat-system/
│   └── payment-system/
├── patterns/
│   ├── microservices.md
│   ├── event-driven.md
│   ├── cqrs-event-sourcing.md
│   └── circuit-breaker.md
├── diagrams/
│   ├── load-balancer.png
│   ├── database-sharding.png
│   ├── caching-strategies.png
│   └── message-queue-flow.png
├── cheat-sheets/
│   ├── estimation-cheat-sheet.md
│   ├── interview-framework.md
│   └── common-numbers.md
└── README.md
```

---

## :rocket: Getting Started

```bash
# Clone the repository
git clone https://github.com/razinahmed/system-design-interview-prep.git

# Navigate to the project
cd system-design-interview-prep

# Start with fundamentals
open fundamentals/01-networking.md

# Or jump to a case study
open case-studies/url-shortener/README.md
```

### Recommended Study Path

1. **Week 1-2**: Fundamentals (networking, databases, caching)
2. **Week 3-4**: Infrastructure (load balancing, CDN, message queues)
3. **Week 5-6**: Patterns (microservices, CQRS, event-driven)
4. **Week 7-8**: Case studies (practice with real-world designs)

---

## :bulb: Interview Framework

Use this **4-step framework** for every system design question:

| Step | Duration | Focus |
|---|---|---|
| **1. Requirements** | 5 min | Functional & non-functional requirements, constraints |
| **2. Estimation** | 5 min | Traffic, storage, bandwidth, QPS calculations |
| **3. High-Level Design** | 15 min | Components, data flow, API design |
| **4. Deep Dive** | 15 min | Scaling bottlenecks, trade-offs, edge cases |

### Back-of-the-Envelope Numbers

| Metric | Value |
|---|---|
| QPS for a single web server | ~1,000 |
| QPS for a single database | ~10,000 |
| Daily active users (large-scale) | ~100M+ |
| Read:Write ratio (social media) | ~100:1 |
| Storage per user profile | ~10 KB |
| Average image size | ~200 KB |

---

## :handshake: Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b topic/new-case-study`
3. **Commit** your changes — `git commit -m "docs: add new case study"`
4. **Push** to the branch — `git push origin topic/new-case-study`
5. **Open** a Pull Request

Diagrams should be created with draw.io or Excalidraw and exported as PNG.

---

## :scroll: License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with :heart: by [Razin Ahmed](https://github.com/razinahmed)**

`System Design` `Interview Prep` `FAANG` `Software Architecture` `Distributed Systems` `Scalability` `Load Balancing`

</div>
