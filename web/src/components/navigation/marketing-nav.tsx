import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button-link";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/45">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold tracking-tight">
            AI Developer OS
          </Link>
          <Badge variant="secondary">Futuristic • Recruiter-focused</Badge>
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
          <ButtonLink variant="ghost" size="sm" href="/projects">
            Projects
          </ButtonLink>
          <ButtonLink variant="ghost" size="sm" href="/system-design">
            System Design
          </ButtonLink>
          <ButtonLink variant="ghost" size="sm" href="/blog">
            Blog
          </ButtonLink>
          <ButtonLink variant="ghost" size="sm" href="/recruiter">
            Recruiter Mode
          </ButtonLink>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink variant="outline" size="sm" href="/dashboard">
            Workspace
          </ButtonLink>
          <ButtonAnchor size="sm" href="/api/resume">
            Resume
          </ButtonAnchor>
        </div>
      </div>
    </header>
  );
}
