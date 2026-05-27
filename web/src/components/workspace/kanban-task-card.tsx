"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card } from "@/components/ui/card";

import type { Task } from "./kanban-board";

export function KanbanTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={
        "cursor-grab border-border/60 bg-card/60 p-3 text-sm active:cursor-grabbing " +
        (isDragging ? "opacity-70" : "")
      }
      {...attributes}
      {...listeners}
    >
      {task.title}
    </Card>
  );
}
