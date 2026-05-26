import {
  Bot,
  Brain,
  LayoutGrid,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/learning", label: "Learning", icon: Brain },
  { href: "/mentor", label: "AI Mentor", icon: Bot },
  { href: "/admin", label: "Admin", icon: Shield },
];

export function WorkspaceNav() {
  return (
    <div className="space-y-2">
      {items.map((i) => (
        <ButtonLink
          key={i.href}
          variant="ghost"
          className="w-full justify-start gap-2"
          href={i.href}
        >
          <i.icon className="size-4" />
          {i.label}
        </ButtonLink>
      ))}

      <Separator className="my-3" />

      <ButtonLink variant="ghost" className="w-full justify-start gap-2" href="/">
        <Sparkles className="size-4" /> Landing
      </ButtonLink>
      <ButtonLink
        variant="ghost"
        className="w-full justify-start gap-2"
        href="/projects"
      >
        <Terminal className="size-4" /> Projects
      </ButtonLink>
    </div>
  );
}
