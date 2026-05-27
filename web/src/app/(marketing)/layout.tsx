import type { ReactNode } from "react";

import { MarketingNav } from "@/components/navigation/marketing-nav";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Built as a production-grade AI engineering ecosystem.</p>
            <p className="font-mono">Next.js • FastAPI • Postgres • Gemini</p>
          </div>
        </div>
      </footer>
    </>
  );
}
