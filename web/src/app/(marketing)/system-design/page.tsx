import { MermaidDiagram } from "@/components/diagrams/mermaid-diagram";
import { Card } from "@/components/ui/card";

const systemOverview = `flowchart TB
  subgraph Web[Next.js (App Router)]
    UI[Marketing + Workspace UI]
    RSC[Server Components]
    APIProxy[Route Handlers (proxy/stream)]
  end

  subgraph API[FastAPI]
    Auth[JWT Auth + RBAC]
    Learn[Learning Engine]
    Chat[AI Mentor + Chat]
    Tasks[Todo + Productivity]
    Admin[Admin APIs]
    WS[WebSockets / SSE]
  end

  subgraph Data[Data + Infra]
    PG[(PostgreSQL)]
    Redis[(Redis)]
    Queue[Celery Workers]
  end

  UI --> APIProxy --> API
  API --> PG
  API --> Redis
  API --> WS
  Queue --> PG
  Queue --> Redis
`;

export default function SystemDesignPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">System Design</h1>
      <p className="mt-2 text-muted-foreground">
        Architecture diagrams: auth, caching, queues, AI pipelines, and realtime.
      </p>

      <div className="mt-10 grid gap-4">
        <Card className="border-border/60 bg-card/60 p-6">
          <h2 className="text-lg font-medium">Platform Overview</h2>
          <div className="mt-6">
            <MermaidDiagram code={systemOverview} />
          </div>
        </Card>
      </div>
    </div>
  );
}
