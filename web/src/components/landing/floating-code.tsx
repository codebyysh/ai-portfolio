"use client";

import { motion } from "framer-motion";

const snippets = [
  "fastapi\n  .include_router(v1)\n  .add_middleware(CORS)",
  "SELECT *\nFROM learning_paths\nWHERE progress < 1.0;",
  "const stream = await ai.chat.stream()",
];

export function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {snippets.map((code, i) => (
        <motion.pre
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4 + i * 0.3,
          }}
          className={
            i === 0
              ? "absolute left-[6%] top-[24%] hidden w-[320px] rounded-2xl border border-border/50 bg-background/35 p-4 text-xs text-foreground/80 backdrop-blur md:block"
              : i === 1
                ? "absolute right-[8%] top-[22%] hidden w-[320px] rounded-2xl border border-border/50 bg-background/35 p-4 text-xs text-foreground/80 backdrop-blur lg:block"
                : "absolute right-[12%] bottom-[18%] hidden w-[280px] rounded-2xl border border-border/50 bg-background/35 p-4 text-xs text-foreground/80 backdrop-blur lg:block"
          }
        >
          <code className="font-mono">{code}</code>
        </motion.pre>
      ))}
    </div>
  );
}
