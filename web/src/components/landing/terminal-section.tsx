"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Line = {
  id: string;
  kind: "system" | "input" | "output";
  text: string;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

async function streamText(text: string, onChunk: (t: string) => void) {
  const parts = text.split("");
  for (const ch of parts) {
    onChunk(ch);
    await new Promise((r) => setTimeout(r, 8));
  }
}

export function TerminalSection() {
  const [busy, setBusy] = useState(false);
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<Line[]>(() => [
    { id: uid(), kind: "system", text: "Initializing AI Engineer Terminal…" },
    {
      id: uid(),
      kind: "system",
      text: "Try: run ai-agent | generate roadmap | deploy backend | analyze architecture",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(
    () => [
      "run ai-agent",
      "generate roadmap",
      "deploy backend",
      "analyze architecture",
      "optimize query",
      "start learning session",
    ],
    []
  );

  const append = useCallback((line: Line) => {
    setLines((prev) => [...prev, line]);
    queueMicrotask(() => {
      scrollRef.current?.scrollIntoView({ block: "end" });
    });
  }, []);

  const run = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      append({ id: uid(), kind: "input", text: `$ ${cmd}` });
      setCommand("");
      setBusy(true);

      const outId = uid();
      append({ id: outId, kind: "output", text: "" });

      const write = (chunk: string) => {
        setLines((prev) =>
          prev.map((l) => (l.id === outId ? { ...l, text: l.text + chunk } : l))
        );
      };

      try {
        if (cmd === "help") {
          await streamText(
            `commands:\n${suggestions.map((s) => `- ${s}`).join("\n")}\n`,
            write
          );
        } else if (cmd === "run ai-agent") {
          await streamText(
            [
              "[agent] scanning repo modules…\n",
              "[agent] validating auth + RBAC…\n",
              "[agent] profiling API latency budget…\n",
              "[agent] generating tasks for learning engine…\n",
              "[agent] ✅ done — see /dashboard for execution view\n",
            ].join(""),
            write
          );
        } else if (cmd === "generate roadmap") {
          await streamText(
            [
              "[ai] planning skill roadmap…\n",
              "[ai] phases: fundamentals → projects → depth → interviews\n",
              "[ai] ✅ open /learning to generate a full roadmap\n",
            ].join(""),
            write
          );
        } else if (cmd === "deploy backend") {
          await streamText(
            [
              "docker compose up -d postgres redis api\n",
              "api: applying migrations…\n",
              "api: starting uvicorn…\n",
              "api: ✅ healthy on :8000\n",
            ].join(""),
            write
          );
        } else if (cmd === "analyze architecture") {
          await streamText(
            [
              "frontend: next.js app router\n",
              "backend: fastapi + sqlalchemy + alembic\n",
              "infra: postgres + redis + celery + nginx\n",
              "realtime: sse/websockets\n",
              "ai: gemini → validated json → stored learning paths\n",
            ].join(""),
            write
          );
        } else if (cmd === "optimize query") {
          await streamText(
            [
              "[db] adding composite index (user_id, status, updated_at)…\n",
              "[cache] caching roadmap summary (redis ttl=15m)…\n",
              "✅ expected p95 improvement: ~35%\n",
            ].join(""),
            write
          );
        } else if (cmd === "start learning session") {
          await streamText(
            [
              "[mentor] session started\n",
              "[mentor] ask: 'explain jwt refresh tokens'\n",
              "✅ open /mentor\n",
            ].join(""),
            write
          );
        } else {
          await streamText(
            `Unknown command: ${cmd}\nType 'help' for options.\n`,
            write
          );
        }
      } finally {
        setBusy(false);
      }
    },
    [append, suggestions]
  );

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Terminal className="size-3.5" /> Live AI Engineer Terminal
            </Badge>
            <Badge variant="outline">Streaming simulation</Badge>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Feels like a real engineering workstation
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Command-driven workflows: agent logs, roadmap generation, deployment
            simulations, and architecture analysis.
          </p>
        </div>

        <Card className="mt-10 border-border/60 bg-card/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              Type a command or click a preset.
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 4).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => run(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="h-[360px]">
            <div className="space-y-2 font-mono text-sm">
              {lines.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    l.kind === "system"
                      ? "text-muted-foreground"
                      : l.kind === "input"
                        ? "text-foreground"
                        : "text-foreground/90"
                  }
                >
                  {l.text}
                </motion.div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="mt-4 flex gap-2">
            <Input
              value={command}
              disabled={busy}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="run ai-agent"
              onKeyDown={(e) => {
                if (e.key === "Enter") run(command);
              }}
              className="font-mono"
            />
            <Button disabled={busy} onClick={() => run(command)}>
              Execute
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
