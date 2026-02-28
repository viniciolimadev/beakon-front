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
    <div className="rounded-lg border border-border bg-card px-6 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-danger" />
          <span className="font-semibold text-lg">{streakDays} dias</span>
          <span className="text-sm text-muted-foreground">seguidos</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Recorde: <span className="text-foreground font-medium">{streakRecord} dias</span>
        </span>
      </div>

      {/* 30-day grid */}
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
                  ? "bg-success"
                  : isToday
                  ? "bg-muted border border-border"
                  : "bg-muted/40"
              )}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-success inline-block" />
          Dia ativo
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-muted/40 inline-block" />
          Inativo
        </span>
      </div>
    </div>
  );
}
