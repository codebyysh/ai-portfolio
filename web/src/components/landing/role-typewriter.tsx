"use client";

import { useEffect, useMemo, useState } from "react";

export function RoleTypewriter({ roles }: { roles: string[] }) {
  const list = useMemo(() => roles.filter(Boolean), [roles]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (list.length === 0) return;

    const full = list[index % list.length];
    const speed = deleting ? 22 : 36;

    const timer = setTimeout(() => {
      const next = deleting
        ? full.slice(0, Math.max(0, text.length - 1))
        : full.slice(0, Math.min(full.length, text.length + 1));

      setText(next);

      if (!deleting && next === full) {
        setTimeout(() => setDeleting(true), 900);
      } else if (deleting && next.length === 0) {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [deleting, index, list, text]);

  return (
    <span className="font-mono text-foreground">
      {text}
      <span className="ml-0.5 inline-block h-4 w-2 translate-y-[1px] animate-pulse rounded-sm bg-foreground/80" />
    </span>
  );
}
