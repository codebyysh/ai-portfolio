---
title: "Designing an AI Learning Engine (Gemini → validated JSON → Postgres)"
summary: "How to build a roadmap generator that is reliable in production: schemas, retries, persistence, and UX streaming." 
date: "2026-05-26"
tags: ["ai", "fastapi", "system-design"]
---

Building an AI learning engine in production is less about *generating text* and more about **reliably producing structured plans**.

## Key requirements

- Strict schemas (Zod/Pydantic) for roadmap output
- Retries + fallbacks when the model returns invalid JSON
- Persistence model that supports progress, tasks, and deadlines
- Streaming UX for perceived performance

## High-level flow

1. User submits intent: skill, goal, experience, timeline
2. API calls Gemini with a *JSON-only* instruction
3. API validates output against a schema
4. API persists the learning path + tasks into Postgres
5. UI renders progress + next steps; tasks can be generated incrementally

```ts
// pseudo
const result = await gemini.generate({ prompt })
const roadmap = RoadmapSchema.parse(JSON.parse(result.text))
await db.learningPath.create({ roadmap })
```

## Production note

Always treat the model output as **untrusted input**.
