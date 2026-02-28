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
    <div className="rounded-xl border border-border bg-surface px-4 py-3 space-y-2.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completed} de {total} tarefas concluídas
        </span>
        <span
          className={
            allDone ? "font-semibold text-success" : "font-medium text-foreground"
          }
        >
          {percentage}%
        </span>
      </div>

      <div className="h-2 w-full rounded-full bg-surface-elevated overflow-hidden">
        <div
          className={
            allDone
              ? "h-full rounded-full bg-success transition-all duration-500"
              : "h-full rounded-full bg-xp-gradient transition-all duration-500"
          }
          style={{ width: `${percentage}%` }}
        />
      </div>

      {allDone && (
        <p className="text-xs text-success text-center">
          🎉 Todas as tarefas concluídas!
        </p>
      )}
    </div>
  );
}
