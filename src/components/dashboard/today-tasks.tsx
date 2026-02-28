"use client";

import { useEffect } from "react";
import { CheckCircle2, Timer, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskCardSkeleton } from "@/components/shared/skeletons";
import { useTaskStore } from "@/stores/taskStore";
import { useAppToast } from "@/lib/toast";
import { TaskStatus, TaskPriority } from "@/types";

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

export function TodayTasks() {
  const router = useRouter();
  const { tasks, isLoading, fetchTasks, completeTask } = useTaskStore();
  const toast = useAppToast();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const todayTasks = tasks.filter((t) => t.status === TaskStatus.Today);

  const handleComplete = async (id: string, title: string) => {
    await completeTask(id);
    toast.xp(25);
    toast.success("Tarefa concluída!", title);
  };

  const handlePomodoro = (id: string) => {
    router.push(`/pomodoro?taskId=${id}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (todayTasks.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Nenhuma tarefa para hoje. Que tal planejar agora?
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todayTasks.map((task) => {
        const overdue = isOverdue(task.dueDate);
        return (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-all hover:border-border/80"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0 rounded-full text-muted-foreground hover:text-success"
              onClick={() => handleComplete(task.id, task.title)}
              aria-label="Concluir tarefa"
            >
              <CheckCircle2 className="h-5 w-5" />
            </Button>

            <span className="flex-1 text-sm font-medium truncate">
              {task.title}
            </span>

            <div className="flex items-center gap-2 shrink-0">
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

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-primary"
                onClick={() => handlePomodoro(task.id)}
                aria-label="Iniciar Pomodoro"
              >
                <Timer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
