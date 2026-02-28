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

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  [TaskPriority.Low]: "bg-success/10 text-success border-success/20",
  [TaskPriority.Medium]: "bg-warning/10 text-warning border-warning/20",
  [TaskPriority.High]: "bg-destructive/10 text-destructive border-destructive/20",
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.Low]: "Baixa",
  [TaskPriority.Medium]: "Média",
  [TaskPriority.High]: "Alta",
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
        "rounded-lg border border-border bg-card p-3 space-y-2 select-none transition-shadow",
        "hover:shadow-md hover:border-border/80",
        isDragging && "opacity-40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-sm font-medium leading-snug flex-1 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          {task.title}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 shrink-0 text-muted-foreground hover:text-foreground"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit(task)}>
              <Pencil className="h-3.5 w-3.5 mr-2" />
              Editar
            </DropdownMenuItem>
            {task.status !== TaskStatus.Today && (
              <DropdownMenuItem onSelect={() => onMoveToToday(task.id)}>
                <CalendarClock className="h-3.5 w-3.5 mr-2" />
                Mover para hoje
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={() => onPomodoro(task.id)}>
              <Timer className="h-3.5 w-3.5 mr-2" />
              Iniciar Pomodoro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => onDelete(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className={cn("text-xs", PRIORITY_STYLES[task.priority])}
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
              overdue ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {new Date(task.dueDate).toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>
    </div>
  );
}
