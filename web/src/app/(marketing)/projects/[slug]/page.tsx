import { notFound } from "next/navigation";

import { MermaidDiagram } from "@/components/diagrams/mermaid-diagram";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug } from "@/content/projects";

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Case Study</Badge>
          <Badge variant="outline">{project.category}</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground">{project.summary}</p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/60 bg-card/60 p-6">
          <h2 className="text-lg font-medium">Architecture</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            High-level system flow (frontend, API gateway, services, data layer).
          </p>
          <div className="mt-6">
            <MermaidDiagram code={project.architectureMermaid} />
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 p-6">
          <h2 className="text-lg font-medium">Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>

          <Separator className="my-6" />

          <h2 className="text-lg font-medium">What This Demonstrates</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {project.highlights.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
