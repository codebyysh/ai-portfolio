import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Case studies that highlight architecture, scalability, and AI systems.
          </p>
        </div>
        <Badge variant="secondary">Recruiter-ready</Badge>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group">
            <Card className="h-full border-border/60 bg-card/60 p-5 transition-colors group-hover:bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-medium">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {p.summary}
                  </div>
                </div>
                <Badge variant="outline">{p.category}</Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.slice(0, 6).map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
