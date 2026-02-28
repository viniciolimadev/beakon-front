"use client";

import { useTaskStore } from "@/stores/taskStore";
import { TaskStatus } from "@/types";

export function DailyProgress() {
  const tasks = useTaskStore((s) => s.tasks);

  const todayTasks = tasks.filter((t) => t.status === TaskStatus.Today);
  const doneTasks = tasks.filter((t) => t.status === TaskStatus.Done);

  const total = todayTasks.length + doneTasks.length;
  const completed = doneTasks.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const allDone = total > 0 && completed === total;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completed} de {total} tarefas concluídas
        </span>
        <span
          className={
            allDone ? "font-semibold text-success" : "text-muted-foreground"
          }
        >
          {percentage}%
        </span>
      </div>

      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {allDone && (
        <p className="text-xs text-success text-center pt-1">
          Todas as tarefas de hoje concluídas! Incrível!
        </p>
      )}
    </div>
  );
}
