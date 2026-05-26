"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { Task, TaskStatus } from "./kanban-board";
import { KanbanTaskCard } from "./kanban-task-card";

export function KanbanColumn({
  id,
  title,
  tasks,
}: {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const taskIds = tasks.map((t) => t.id);

  return (
    <Card
      ref={setNodeRef}
      className={
        "min-h-[280px] border-border/60 bg-background/30 p-4 " +
        (isOver ? "ring-2 ring-ring/30" : "")
      }
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{tasks.length}</div>
      </div>
      <Separator className="my-3" />

      <SortableContext items={taskIds} strategy={rectSortingStrategy}>
        <div className="space-y-2">
          {tasks.map((t) => (
            <KanbanTaskCard key={t.id} task={t} />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
}
