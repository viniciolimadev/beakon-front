"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CalendarClock,
  Clock,
  MoreHorizontal,
  Pencil,
  Timer,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task, TaskPriority, TaskStatus } from "@/types";

const PRIORITY_DOT: Record<TaskPriority, string> = {
  [TaskPriority.Low]: "bg-success",
  [TaskPriority.Medium]: "bg-warning",
  [TaskPriority.High]: "bg-danger",
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.Low]: "Baixa",
  [TaskPriority.Medium]: "Média",
  [TaskPriority.High]: "Alta",
};

const PRIORITY_BADGE_VARIANT: Record<
  TaskPriority,
  "success" | "warning" | "danger"
> = {
  [TaskPriority.Low]: "success",
  [TaskPriority.Medium]: "warning",
  [TaskPriority.High]: "danger",
};

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMoveToToday: (id: string) => void;
  onPomodoro: (id: string) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onMoveToToday,
  onPomodoro,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const overdue = isOverdue(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-xl border border-border bg-surface p-3 space-y-2 select-none",
        "transition-all duration-150",
        "hover:-translate-y-0.5 hover:shadow-card hover:border-border-accent",
        isDragging && "opacity-50 scale-105 shadow-modal cursor-grabbing rotate-1"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-sm font-medium leading-snug flex-1 cursor-grab active:cursor-grabbing text-foreground"
          {...attributes}
          {...listeners}
        >
          {task.title}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-6 w-6 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-surface-elevated border-border">
            <DropdownMenuItem onSelect={() => onEdit(task)} className="gap-2">
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </DropdownMenuItem>
            {task.status !== TaskStatus.Today && (
              <DropdownMenuItem onSelect={() => onMoveToToday(task.id)} className="gap-2">
                <CalendarClock className="h-3.5 w-3.5" />
                Mover para hoje
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={() => onPomodoro(task.id)} className="gap-2">
              <Timer className="h-3.5 w-3.5" />
              Iniciar Pomodoro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-danger focus:text-danger gap-2"
              onSelect={() => onDelete(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant={PRIORITY_BADGE_VARIANT[task.priority]}
          dot
        >
          {PRIORITY_LABELS[task.priority]}
        </Badge>

        {task.estimatedMinutes && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {task.estimatedMinutes}min
          </span>
        )}

        {task.dueDate && (
          <span
            className={cn(
              "text-xs",
              overdue ? "text-danger font-medium" : "text-muted-foreground"
            )}
          >
            {new Date(task.dueDate).toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>
    </div>
  );
}
