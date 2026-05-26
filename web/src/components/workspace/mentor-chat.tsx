"use client";

import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Msg = { id: string; role: "user" | "assistant"; content: string };

function uid() {
  return Math.random().toString(16).slice(2);
}

export function MentorChat() {
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: uid(),
      role: "assistant",
      content:
        "I’m your AI mentor (senior engineer + career coach). Ask about architecture, debugging, interviews, or roadmaps.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const api = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    []
  );

  const send = async () => {
    const content = text.trim();
    if (!content || busy) return;
    setText("");
    setBusy(true);

    const userMsg: Msg = { id: uid(), role: "user", content };
    const assistantId = uid();
    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);

    const write = (chunk: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
      );
      queueMicrotask(() => bottomRef.current?.scrollIntoView({ block: "end" }));
    };

    try {
      const res = await fetch(`${api}/v1/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok || !res.body) {
        write(
          "(Backend not running yet. Start FastAPI to enable streaming mentor responses.)"
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        write(decoder.decode(value));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="border-border/60 bg-card/60 p-5">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-lg font-medium">Mentor workspace</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Streaming responses + context memory (API-backed).
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      <ScrollArea className="h-[420px]">
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user"
                  ? "ml-auto w-[92%] rounded-2xl border border-border/60 bg-background/40 p-3 text-sm"
                  : "mr-auto w-[92%] rounded-2xl border border-border/60 bg-card/60 p-3 text-sm"
              }
            >
              <div className="mb-1 text-xs text-muted-foreground">
                {m.role === "user" ? "You" : "Mentor"}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.content || (busy && m.role === "assistant" ? "…" : "")}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="mt-4 flex gap-2">
        <Input
          value={text}
          disabled={busy}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask: 'Explain JWT refresh tokens'"
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <Button disabled={busy} onClick={send}>
          Send
        </Button>
      </div>
    </Card>
  );
}
