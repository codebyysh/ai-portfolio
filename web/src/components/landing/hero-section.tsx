"use client";

import dynamic from "next/dynamic";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  GitFork,
  Mail,
  MapPin,
  Radar,
  Sparkles,
  Terminal,
} from "lucide-react";

import { ContributionHeatmap } from "@/components/landing/contribution-heatmap";
import { FloatingCode } from "@/components/landing/floating-code";
import { HeroTerminalOverlay } from "@/components/landing/hero-terminal-overlay";
import { RoleTypewriter } from "@/components/landing/role-typewriter";
import { Magnetic } from "@/components/shared/magnetic";
import { Badge } from "@/components/ui/badge";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const NeuralCanvas = dynamic(() => import("@/components/landing/neural-canvas"), {
  ssr: false,
});

const expertise = [
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Celery",
  "WebSockets",
  "Gemini",
  "System Design",
  "DevOps",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-grid opacity-[0.35]" />
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 opacity-80">
          <NeuralCanvas />
        </div>
      </div>

      <FloatingCode />
      <HeroTerminalOverlay />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-16 pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Radar className="size-3.5" /> Available
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="size-3.5" /> AI systems • Full-stack
              </Badge>
              <Badge variant="outline" className="gap-1">
                <MapPin className="size-3.5" /> Remote / Hybrid
              </Badge>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              A futuristic AI-powered developer ecosystem — built like a startup
              product.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground"
            >
              Portfolio + learning engine + AI mentor + productivity OS. Designed
              to prove production-grade architecture, product thinking, and modern
              UI/UX.
            </motion.p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="size-4" />
              <span className="font-mono">role:</span>
              <RoleTypewriter
                roles={[
                  "AI Systems Engineer",
                  "Full-Stack Product Builder",
                  "Automation & Platform Engineer",
                  "Backend + DevOps Engineer",
                ]}
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {expertise.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <ButtonAnchor href="/api/resume">Download resume</ButtonAnchor>
              </Magnetic>
              <Magnetic>
                <ButtonLink variant="outline" href="/projects">
                  View projects
                </ButtonLink>
              </Magnetic>
              <ButtonLink variant="ghost" href="/dashboard">
                Open workspace
              </ButtonLink>
              <ButtonAnchor
                variant="ghost"
                href="mailto:you@example.com"
                className="gap-2"
              >
                <Mail className="size-4" /> Contact
              </ButtonAnchor>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <ButtonAnchor
                size="icon"
                variant="outline"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitFork className="size-4" />
              </ButtonAnchor>
              <ButtonAnchor
                size="icon"
                variant="outline"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <BriefcaseBusiness className="size-4" />
              </ButtonAnchor>
            </div>
          </div>

          <Card className="border-border/60 bg-card/60 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">System status</div>
                <div className="mt-1 text-lg font-medium">Operational</div>
              </div>
              <Badge variant="secondary">v0</Badge>
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="text-sm font-medium">GitHub activity</div>
              <ContributionHeatmap />
              <div className="text-xs text-muted-foreground">
                Connect a `GITHUB_TOKEN` to show real data.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
