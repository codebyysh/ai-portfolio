import type { ReactNode } from "react";

import { WorkspaceNav } from "@/components/shell/workspace-nav";
import { Badge } from "@/components/ui/badge";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100svh-56px)]">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-10 lg:grid-cols-[260px_1fr]">
        <Card className="h-fit border-border/60 bg-card/60 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="font-medium tracking-tight">Workspace</div>
            <Badge variant="secondary">OS</Badge>
          </div>
          <div className="mt-4">
            <WorkspaceNav />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <ButtonLink variant="outline" size="sm" href="/">
              Back to marketing
            </ButtonLink>
            <ButtonAnchor size="sm" href="/api/resume">
              Resume
            </ButtonAnchor>
          </div>
        </Card>

        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Futuristic developer operating system
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Streaming-ready</Badge>
              <Badge variant="secondary">RBAC-ready</Badge>
            </div>
          </div>
          <Card className="border-border/60 bg-card/40 p-6 backdrop-blur">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
