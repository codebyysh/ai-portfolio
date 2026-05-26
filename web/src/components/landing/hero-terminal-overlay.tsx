"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

import { Card } from "@/components/ui/card";

const lines = [
  "boot: ai-dev-os v0",
  "auth: jwt ready",
  "db: postgres connected",
  "cache: redis online",
  "ai: gemini client warm",
  "ws: realtime enabled",
];

export function HeroTerminalOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="pointer-events-none absolute bottom-8 left-1/2 z-[6] hidden w-[720px] -translate-x-1/2 lg:block"
    >
      <Card className="border-border/60 bg-background/30 p-4 backdrop-blur">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal className="size-4" />
          <span className="font-mono">live system</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
          {lines.map((l) => (
            <div key={l} className="font-mono text-xs text-foreground/80">
              <span className="text-muted-foreground">$</span> {l}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
