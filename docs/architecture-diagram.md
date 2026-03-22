<!-- Architecture diagram for AppIQ (Mermaid) -->
# Architecture Diagram

The diagram below shows the high-level runtime components and data flows for AppIQ.

```mermaid
---
id: a0d8cefc-8f88-449e-8e72-99339466bb94
---
flowchart LR
  subgraph Client [Browser - AppIQ SPA]
    A[UI: Pages & Widgets] -->|uses| Features[Features/*]
    Features -->|reads/writes| DB[s14]
    Features -->|calls| Shared[s15]
  end

  A -.-> Sync[s13]
  Sync -->|HTTP / Web| Server[Server / Cloud Storage]
  Server --> Integrations["Integrations (Greenhouse, Lever, etc.)"]

  classDef client fill:#f7fff7,stroke:#48bb78,stroke-width:1px;
  classDef infra fill:#f0f5ff,stroke:#667eea,stroke-width:1px;
  class Client,A,Features,DB,Shared client;
  class Server,Integrations,Sync infra;
```

Notes:

- The client is an SPA (React + Vite) that persists to Dexie for offline capability.
- `Sync` represents a background process that reconciles local changes with the server.
- Integrations are implemented as isolated adapters and live on the server-side or as callable services.
