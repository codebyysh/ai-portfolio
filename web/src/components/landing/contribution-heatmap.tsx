"use client";

import { useQuery } from "@tanstack/react-query";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;
type ContributionDay = { date: string; count: number; level: ContributionLevel };
type ContributionWeek = { days: ContributionDay[] };
type ContributionsResponse = {
  source: "github" | "placeholder";
  total: number;
  weeks: ContributionWeek[];
};

function levelClass(level: ContributionLevel) {
  switch (level) {
    case 0:
      return "bg-muted/35";
    case 1:
      return "bg-muted";
    case 2:
      return "bg-foreground/15";
    case 3:
      return "bg-foreground/25";
    case 4:
      return "bg-foreground/35";
  }
}

async function fetchContributions() {
  const res = await fetch("/api/github/contributions", { cache: "no-store" });
  if (!res.ok) throw new Error("failed");
  return (await res.json()) as ContributionsResponse;
}

export function ContributionHeatmap() {
  const q = useQuery({
    queryKey: ["github", "contributions"],
    queryFn: fetchContributions,
  });

  if (q.isLoading) {
    return (
      <div className="grid grid-flow-col gap-1">
        {Array.from({ length: 20 }).map((_, w) => (
          <div key={w} className="grid gap-1">
            {Array.from({ length: 7 }).map((__, d) => (
              <div
                key={d}
                className="h-2.5 w-2.5 rounded-sm bg-muted/30"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  const weeks = (q.data?.weeks || []).slice(-20);
  const total = q.data?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{total.toLocaleString()} contributions</span>
        <span className="font-mono">last 20 weeks</span>
      </div>

      <div className="grid grid-flow-col gap-1">
        {weeks.map((w, wi) => (
          <div key={wi} className="grid gap-1">
            {w.days.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.count}`}
                className={`h-2.5 w-2.5 rounded-sm ${levelClass(d.level)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
