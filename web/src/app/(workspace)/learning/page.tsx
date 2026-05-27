import { LearningGenerator } from "@/components/workspace/learning-generator";

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Learning</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate roadmaps, phases, daily plans, and projects using Gemini.
        </p>
      </div>
      <LearningGenerator />
    </div>
  );
}
