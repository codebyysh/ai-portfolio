import { Badge } from "@/components/ui/badge";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";

export default function RecruiterModePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Recruiter Mode</Badge>
        <Badge variant="outline">1-minute overview</Badge>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Why hire this engineer
      </h1>
      <p className="mt-2 text-muted-foreground">
        Product-minded full-stack + AI systems engineer focused on production-grade
        execution.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card className="border-border/60 bg-card/60 p-6">
          <div className="text-lg font-medium">Production mindset</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Auth, validation, background workers, caching, observability, and
            scalable architecture are first-class.
          </p>
        </Card>
        <Card className="border-border/60 bg-card/60 p-6">
          <div className="text-lg font-medium">AI systems builder</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Gemini-powered learning engine, mentor workspace, and agentic
            workflows with streaming UX.
          </p>
        </Card>
        <Card className="border-border/60 bg-card/60 p-6">
          <div className="text-lg font-medium">Modern UI/UX</div>
          <p className="mt-2 text-sm text-muted-foreground">
            SaaS-grade components, motion, and optimized 3D for a premium,
            recruiter-attracting experience.
          </p>
        </Card>
        <Card className="border-border/60 bg-card/60 p-6">
          <div className="text-lg font-medium">Ownership</div>
          <p className="mt-2 text-sm text-muted-foreground">
            End-to-end delivery: frontend, backend, DevOps, and data design with
            clear trade-offs.
          </p>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonAnchor href="/api/resume">Download resume</ButtonAnchor>
        <ButtonLink variant="outline" href="/projects">
          View projects
        </ButtonLink>
        <ButtonLink variant="ghost" href="/">
          Back to home
        </ButtonLink>
      </div>
    </div>
  );
}
