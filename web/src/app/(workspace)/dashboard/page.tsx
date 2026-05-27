import { KanbanBoard } from "@/components/workspace/kanban-board";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Productivity OS: tasks, focus, and learning progress.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 bg-card/60 p-5">
          <div className="text-sm text-muted-foreground">Learning progress</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Connect the backend to persist progress.
          </div>
        </Card>
        <Card className="border-border/60 bg-card/60 p-5">
          <div className="text-sm text-muted-foreground">Task velocity</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Kanban drag & drop is enabled.
          </div>
        </Card>
        <Card className="border-border/60 bg-card/60 p-5">
          <div className="text-sm text-muted-foreground">AI sessions</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Mentor chat streams once API is running.
          </div>
        </Card>
      </div>

      <KanbanBoard />
    </div>
  );
}
