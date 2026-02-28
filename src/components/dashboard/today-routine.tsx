"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoutineItemSkeleton } from "@/components/shared/skeletons";
import { Routine } from "@/types";
import api from "@/services/api";

function isCurrentItem(time: string): boolean {
  const now = new Date();
  const [h, m] = time.split(":").map(Number);
  const itemMinutes = h * 60 + m;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return Math.abs(nowMinutes - itemMinutes) < 30;
}

export function TodayRoutine() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<Routine[]>("/api/routines/today")
      .then((res) => setRoutines(res.data))
      .catch(() => setRoutines([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <RoutineItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (routines.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Nenhuma rotina para hoje. Que tal criar uma?
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {routines.map((routine) => {
        const isCurrent = isCurrentItem(routine.time);
        return (
          <div
            key={routine.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
              isCurrent
                ? "border-primary/50 bg-primary/5"
                : "border-border bg-card"
            )}
          >
            {isCurrent && (
              <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
            )}
            <Clock
              className={cn(
                "h-4 w-4 shrink-0",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-medium flex-1">{routine.title}</span>
            <span className="text-xs text-muted-foreground">{routine.time}</span>
          </div>
        );
      })}
    </div>
  );
}
