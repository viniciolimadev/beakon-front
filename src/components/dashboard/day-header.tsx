"use client";

import { useAuthStore } from "@/stores/authStore";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useTaskStore } from "@/stores/taskStore";
import { TaskStatus } from "@/types";
import { Flame } from "lucide-react";

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Bom dia, ${name}!`;
  if (hour < 18) return `Boa tarde, ${name}!`;
  return `Boa noite, ${name}!`;
}

function formatDate(): string {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function DayHeader() {
  const user = useAuthStore((s) => s.user);
  const { streakDays, dashboard } = useGamificationStore();
  const tasks = useTaskStore((s) => s.tasks);

  const todayTasks = tasks.filter((t) => t.status === TaskStatus.Today);
  const focusMinutes = dashboard?.focusMinutesToday ?? 0;

  const firstName = user?.name.split(" ")[0] ?? "você";

  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold text-foreground">
        {getGreeting(firstName)}
      </h2>
      <p className="text-sm text-muted-foreground capitalize">
        {formatDate()}
      </p>
      <p className="text-sm text-muted-foreground flex items-center gap-1 pt-1">
        <span>{todayTasks.length} tarefas para hoje</span>
        <span className="text-border">·</span>
        <span>{focusMinutes} min focados</span>
        <span className="text-border">·</span>
        <Flame className="h-3.5 w-3.5 text-danger" />
        <span>{streakDays} dias</span>
      </p>
    </div>
  );
}
