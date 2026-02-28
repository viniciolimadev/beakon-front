"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamificationStore } from "@/stores/gamificationStore";

export function StreakCalendar() {
  const { streakDays, streakRecord, activeDays } = useGamificationStore();

  // Build last 30 days array
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  const activeSet = new Set(activeDays);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-xl border border-border bg-surface px-5 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-danger/10">
            <Flame className="h-4 w-4 text-danger" />
          </div>
          <div>
            <p className="text-base font-semibold">
              <span className="font-mono tabular-nums">{streakDays}</span> dias seguidos
            </p>
            <p className="text-xs text-muted-foreground">
              Recorde:{" "}
              <span className="text-foreground font-medium font-mono">{streakRecord}</span> dias
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">últimos 30 dias</span>
      </div>

      {/* 30-day heatmap grid */}
      <div className="grid grid-cols-10 gap-1.5" suppressHydrationWarning>
        {days.map((day) => {
          const isActive = activeSet.has(day);
          const isToday = day === today;
          return (
            <div
              key={day}
              title={day}
              className={cn(
                "aspect-square rounded-sm transition-colors",
                isActive
                  ? "bg-success shadow-[0_0_6px_rgba(34,197,94,0.4)]"
                  : isToday
                  ? "bg-surface-elevated border-2 border-primary/40"
                  : "bg-surface-elevated/60"
              )}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-success inline-block" />
          Dia ativo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border-2 border-primary/40 bg-surface-elevated inline-block" />
          Hoje
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-surface-elevated/60 inline-block" />
          Inativo
        </span>
      </div>
    </div>
  );
}
