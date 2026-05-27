"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  skill: z.string().min(2),
  goal: z.string().min(2),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  timelineWeeks: z.coerce.number().int().min(1).max(104),
  dailyHours: z.coerce.number().min(0.5).max(12),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

type Roadmap = {
  title: string;
  summary: string;
  phases: { title: string; weeks: number; outcomes: string[] }[];
  projects: { title: string; description: string }[];
};

async function generateRoadmap(values: FormValues): Promise<Roadmap> {
  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const res = await fetch(`${api}/v1/learning/roadmaps/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (res.ok) return (await res.json()) as Roadmap;

  // fallback for when backend isn't running yet
  return {
    title: `Roadmap: ${values.skill}`,
    summary:
      "Start the backend to generate a full Gemini roadmap. This is a fallback preview.",
    phases: [
      {
        title: "Fundamentals",
        weeks: Math.max(2, Math.floor(values.timelineWeeks * 0.3)),
        outcomes: [
          "Core concepts & mental models",
          "Hands-on exercises",
          "Mini project",
        ],
      },
      {
        title: "Projects",
        weeks: Math.max(2, Math.floor(values.timelineWeeks * 0.4)),
        outcomes: ["Ship 2 portfolio projects", "Testing + docs", "Deploy"],
      },
      {
        title: "Interview prep",
        weeks: Math.max(2, Math.floor(values.timelineWeeks * 0.3)),
        outcomes: ["DSA patterns", "System design", "Resume + stories"],
      },
    ],
    projects: [
      {
        title: "Production API",
        description: "FastAPI + Postgres + Redis + Celery with auth and docs.",
      },
      {
        title: "AI Mentor Workspace",
        description: "Streaming chat + roadmap generator + analytics dashboard.",
      },
    ],
  };
}

export function LearningGenerator() {
  const form = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      skill: "FastAPI",
      goal: "Become an AI Backend Engineer",
      experience: "intermediate",
      timelineWeeks: 12,
      dailyHours: 2,
    },
  });

  const mutation = useMutation({ mutationFn: generateRoadmap });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="border-border/60 bg-card/60 p-6">
        <div className="text-lg font-medium">Roadmap generator</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Gemini produces phases, projects, and a daily structure.
        </p>

        <Separator className="my-6" />

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="skill">Skill</Label>
            <Input id="skill" {...form.register("skill")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Career goal</Label>
            <Textarea id="goal" rows={3} {...form.register("goal")} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <select
                id="experience"
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                {...form.register("experience")}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timelineWeeks">Timeline (weeks)</Label>
              <Input id="timelineWeeks" type="number" {...form.register("timelineWeeks")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyHours">Daily learning hours</Label>
            <Input id="dailyHours" type="number" step="0.5" {...form.register("dailyHours")} />
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Generating…" : "Generate roadmap"}
          </Button>
        </form>
      </Card>

      <Card className="border-border/60 bg-card/60 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-lg font-medium">Output</div>
          <Badge variant={mutation.data?.title ? "secondary" : "outline"}>
            {mutation.data?.title ? "Generated" : "Idle"}
          </Badge>
        </div>

        <Separator className="my-6" />

        {!mutation.data ? (
          <div className="text-sm text-muted-foreground">
            Generate a roadmap to see phases, outcomes, and project recommendations.
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="text-xl font-semibold">{mutation.data.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {mutation.data.summary}
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Phases</div>
              {mutation.data.phases.map((p) => (
                <Card key={p.title} className="border-border/60 bg-background/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{p.title}</div>
                    <Badge variant="outline">{p.weeks}w</Badge>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {p.outcomes.map((o) => (
                      <li key={o}>• {o}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Projects</div>
              {mutation.data.projects.map((p) => (
                <Card key={p.title} className="border-border/60 bg-background/30 p-4">
                  <div className="font-medium">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {p.description}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
