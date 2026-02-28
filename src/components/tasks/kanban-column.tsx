"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/types";
import { TaskCard } from "./task-card";
import { InboxQuickCapture } from "./inbox-quick-capture";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMoveToToday: (id: string) => void;
  onPomodoro: (id: string) => void;
}

const EMPTY_MESSAGES: Record<TaskStatus, string> = {
  [TaskStatus.Inbox]: "Use o campo acima para capturar tarefas.",
  [TaskStatus.Today]: "Nada para hoje. Mova tarefas do backlog!",
  [TaskStatus.ThisWeek]: "Nenhuma tarefa para esta semana.",
  [TaskStatus.Backlog]: "Backlog vazio. Ótimo trabalho!",
  [TaskStatus.Done]: "Nenhuma tarefa concluída ainda.",
};

export function KanbanColumn({
  id,
  title,
  tasks,
  onEdit,
  onDelete,
  onMoveToToday,
  onPomodoro,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col w-72 shrink-0">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5 tabular-nums">
          {tasks.length}
        </span>
      </div>

      {id === TaskStatus.Inbox && <InboxQuickCapture />}

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-2 rounded-lg p-2 min-h-[200px] transition-colors overflow-y-auto max-h-[calc(100vh-220px)]",
          isOver
            ? "bg-primary/5 border border-dashed border-primary/40"
            : "border border-transparent"
        )}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMoveToToday={onMoveToToday}
              onPomodoro={onPomodoro}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground text-center pt-6 px-2">
            {EMPTY_MESSAGES[id]}
          </p>
        )}
      </div>
    </div>
  );
}
