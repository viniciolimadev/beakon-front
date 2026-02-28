"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { Inbox, CalendarCheck, CalendarDays, Archive, CheckCheck } from "lucide-react";
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
  onComplete: (id: string) => void;
}

const EMPTY_STATES: Record<
  TaskStatus,
  { message: string; sub?: string; Icon: React.ElementType }
> = {
  [TaskStatus.Inbox]: {
    Icon: Inbox,
    message: "Tudo organizado!",
    sub: "Capture sua próxima ideia.",
  },
  [TaskStatus.Today]: {
    Icon: CalendarCheck,
    message: "Nenhuma tarefa para hoje.",
    sub: "Que tal planejar agora?",
  },
  [TaskStatus.ThisWeek]: {
    Icon: CalendarDays,
    message: "Semana livre por enquanto.",
    sub: "Mova tarefas do backlog.",
  },
  [TaskStatus.Backlog]: {
    Icon: Archive,
    message: "Backlog vazio.",
    sub: "Ótimo trabalho!",
  },
  [TaskStatus.Done]: {
    Icon: CheckCheck,
    message: "Nenhuma tarefa concluída.",
    sub: "Comece e volte aqui! 🚀",
  },
};

export function KanbanColumn({
  id,
  title,
  tasks,
  onEdit,
  onDelete,
  onMoveToToday,
  onPomodoro,
  onComplete,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column header — uppercase label style */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          {title}
        </h3>
        <span className="text-xs font-mono text-muted-foreground/70 bg-surface-elevated rounded-full px-2 py-0.5 tabular-nums border border-border">
          {tasks.length}
        </span>
      </div>

      {id === TaskStatus.Inbox && <InboxQuickCapture />}

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-2 rounded-xl p-2 min-h-[200px] transition-all duration-200",
          "overflow-y-auto max-h-[calc(100vh-220px)]",
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
              onComplete={onComplete}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (() => {
          const { Icon, message, sub } = EMPTY_STATES[id];
          return (
            <div className="flex flex-col items-center gap-1.5 pt-8 px-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated">
                <Icon className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">{message}</p>
              {sub && <p className="text-xs text-muted-foreground/50">{sub}</p>}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
