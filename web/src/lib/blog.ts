import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTimeText: string;
  content: string;
};

export async function getAllPosts() {
  const entries = await fs.readdir(BLOG_DIR);
  const slugs = entries
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  const posts = await Promise.all(slugs.map((s) => getPostBySlug(s)));
  return posts
    .filter(Boolean)
    .sort((a, b) => (a!.date < b!.date ? 1 : -1)) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const full = path.join(BLOG_DIR, `${slug}.md`);
    const raw = await fs.readFile(full, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;

    const title = String(data.title || slug);
    const summary = String(data.summary || "");
    const date = String(data.date || "");
    const rt = readingTime(parsed.content);

    return {
      slug,
      title,
      summary,
      date,
      readingTimeText: rt.text,
      content: parsed.content,
    };
  } catch {
    return null;
  }
}
