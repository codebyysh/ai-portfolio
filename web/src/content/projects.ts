export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: "AI Platform" | "Developer OS" | "Learning Engine";
  stack: string[];
  highlights: string[];
  architectureMermaid: string;
};

export const projects: Project[] = [
  {
    slug: "ai-dev-os",
    title: "AI Developer OS",
    summary:
      "A recruiter-attracting engineering platform: portfolio, AI mentor, learning engine, productivity dashboard, and admin.",
    category: "Developer OS",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Gemini",
      "Docker",
    ],
    highlights: [
      "Streaming AI mentor responses (SSE/WebSockets)",
      "Gemini-generated roadmaps validated into strict JSON schemas",
      "RBAC-ready Admin system for content + prompts",
      "Dockerized infra: Postgres + Redis + API + Nginx",
      "3D hero background optimized for performance",
    ],
    architectureMermaid: `flowchart LR
  User((User)) --> Web[Next.js UI]
  Web -->|JWT cookies| API[FastAPI]
  API --> PG[(Postgres)]
  API --> Redis[(Redis)]
  API -->|async| Celery[Celery Workers]
  Celery --> PG
  Celery --> Redis
  API -->|stream| SSE[SSE/WebSockets]
  API --> Gemini[Gemini API]
`,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) || null;
}
