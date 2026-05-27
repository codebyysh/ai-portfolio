"use client";

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { KanbanColumn } from "./kanban-column";

export type TaskStatus = "todo" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const columns: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];

function initialTasks(): Task[] {
  return [
    { id: "t1", title: "Generate AI roadmap (Gemini)", status: "todo" },
    { id: "t2", title: "Stream mentor chat responses", status: "doing" },
    { id: "t3", title: "Ship Docker + Compose", status: "todo" },
    { id: "t4", title: "Admin CRUD for projects/blog", status: "todo" },
    { id: "t5", title: "Landing hero polish + perf", status: "done" },
  ];
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(() => initialTasks());

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const idsByColumn = useMemo(() => {
    const map: Record<TaskStatus, string[]> = { todo: [], doing: [], done: [] };
    for (const t of tasks) map[t.status].push(t.id);
    return map;
  }, [tasks]);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overTask = tasks.find((t) => t.id === overId);
    const overColumn = columns.find((c) => c.id === overId)?.id;

    if (overColumn) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, status: overColumn } : t))
      );
      return;
    }

    if (!overTask) return;

    if (activeTask.status !== overTask.status) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, status: overTask.status } : t))
      );
      return;
    }

    const same = tasks.filter((t) => t.status === activeTask.status);
    const oldIndex = same.findIndex((t) => t.id === activeId);
    const newIndex = same.findIndex((t) => t.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(same, oldIndex, newIndex);
    setTasks((prev) => {
      const other = prev.filter((t) => t.status !== activeTask.status);
      return [...other, ...reordered];
    });
  };

  return (
    <Card className="border-border/60 bg-card/60 p-5">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-lg font-medium">Kanban</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Drag tasks across columns (local state for now).
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map((c) => (
            <SortableContext
              key={c.id}
              items={idsByColumn[c.id]}
              strategy={rectSortingStrategy}
            >
              <KanbanColumn
                id={c.id}
                title={c.title}
                tasks={tasks.filter((t) => t.status === c.id)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </Card>
  );
}
