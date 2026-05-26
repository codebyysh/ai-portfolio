import Link from "next/link";

import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/blog";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        AI systems, FastAPI, React architecture, system design, and DevOps.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
            <Card className="h-full border-border/60 bg-card/60 p-5 transition-colors group-hover:bg-card">
              <div className="text-lg font-medium">{p.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {p.summary}
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                {p.readingTimeText} • {p.date}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
