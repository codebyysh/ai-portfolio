"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function AdminPanel() {
  const [markdown, setMarkdown] = useState<string>(
    "# New post\n\nWrite in Markdown. This will later save to Postgres and be versioned.\n"
  );

  return (
    <Card className="border-border/60 bg-card/60 p-5">
      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
          <TabsTrigger value="uploads">Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            Admin is scaffolded. Next step: connect RBAC + CRUD endpoints.
          </div>

          <Separator />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Blog title</Label>
              <Input id="title" placeholder="Agentic AI in production" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="agentic-ai-in-production" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="md">Markdown</Label>
            <Textarea
              id="md"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={12}
              className="font-mono"
            />
          </div>
        </TabsContent>

        <TabsContent value="prompts" className="mt-4">
          <div className="text-sm text-muted-foreground">
            Store and version Gemini prompts for roadmaps, mentor, and task
            generation.
          </div>
        </TabsContent>

        <TabsContent value="uploads" className="mt-4">
          <div className="text-sm text-muted-foreground">
            Resume upload will replace the placeholder PDF served at /api/resume.
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
