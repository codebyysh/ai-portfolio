"use client";

import mermaid from "mermaid";
import { useEffect, useId, useMemo, useState } from "react";

export function MermaidDiagram({ code }: { code: string }) {
  const id = useId().replaceAll(":", "");
  const [svg, setSvg] = useState<string>("");

  const normalized = useMemo(() => code.trim(), [code]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "dark",
    });
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { svg: out } = await mermaid.render(`m-${id}`, normalized);
        if (alive) setSvg(out);
      } catch {
        if (alive) setSvg("<pre>Failed to render diagram.</pre>");
      }
    })();

    return () => {
      alive = false;
    };
  }, [id, normalized]);

  return (
    <div
      className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/40 p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
