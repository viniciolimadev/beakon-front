"use client";

import { cn } from "@/lib/utils";
import { useRoutineStore } from "@/stores/routineStore";
import { Weekday } from "@/types/routine";

const DAYS: { value: Weekday; label: string; short: string }[] = [
  { value: 0, label: "Domingo", short: "Dom" },
  { value: 1, label: "Segunda", short: "Seg" },
  { value: 2, label: "Terça", short: "Ter" },
  { value: 3, label: "Quarta", short: "Qua" },
  { value: 4, label: "Quinta", short: "Qui" },
  { value: 5, label: "Sexta", short: "Sex" },
  { value: 6, label: "Sábado", short: "Sáb" },
];

export function WeeklyView() {
  const routines = useRoutineStore((s) => s.routines);
  const today = new Date().getDay() as Weekday;

  const activeRoutines = routines.filter((r) => r.isActive);

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {DAYS.map((day) => {
        const dayRoutines = activeRoutines
          .filter((r) => r.weekdays.includes(day.value))
          .sort((a, b) => a.time.localeCompare(b.time));

        const isToday = day.value === today;

        return (
          <div key={day.value} className="flex flex-col gap-1.5">
            {/* Day header */}
            <div
              className={cn(
                "text-center rounded-lg py-1.5 px-1",
                isToday
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide">
                {day.short}
              </p>
              <p
                className={cn(
                  "text-xs tabular-nums",
                  isToday ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {dayRoutines.length}
              </p>
            </div>

            {/* Routine pills */}
            <div className="space-y-1">
              {dayRoutines.map((routine) => (
                <div
                  key={routine.id}
                  className={cn(
                    "rounded px-1.5 py-1 text-center",
                    isToday ? "bg-primary/10" : "bg-card border border-border"
                  )}
                  title={`${routine.title} — ${routine.time}`}
                >
                  <p className="text-[9px] font-medium truncate leading-tight">
                    {routine.title}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-mono">
                    {routine.time}
                  </p>
                </div>
              ))}

              {dayRoutines.length === 0 && (
                <div className="rounded border border-dashed border-border h-8 flex items-center justify-center">
                  <span className="text-[9px] text-muted-foreground/50">—</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
