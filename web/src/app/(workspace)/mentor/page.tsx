import { MentorChat } from "@/components/workspace/mentor-chat";

export default function MentorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Mentor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Senior-engineer style coaching, debugging, interview prep, and learning.
        </p>
      </div>
      <MentorChat />
    </div>
  );
}
