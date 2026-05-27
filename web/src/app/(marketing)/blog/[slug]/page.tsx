import { notFound } from "next/navigation";

import { Markdown } from "@/components/blog/markdown";
import { Card } from "@/components/ui/card";
import { getPostBySlug } from "@/lib/blog";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-2 text-muted-foreground">{post.summary}</p>
      <div className="mt-4 text-sm text-muted-foreground">
        {post.date} • {post.readingTimeText}
      </div>

      <Card className="mt-10 border-border/60 bg-card/60 p-6">
        <Markdown content={post.content} />
      </Card>
    </div>
  );
}
