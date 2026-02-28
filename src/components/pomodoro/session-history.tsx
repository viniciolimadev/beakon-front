"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { usePomodoroStore } from "@/stores/pomodoroStore";

export function SessionHistory() {
  const todaySessions = usePomodoroStore((s) => s.todaySessions);

  const totalMinutes = todaySessions
    .filter((s) => s.completed)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  if (todaySessions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Nenhuma sessão registrada hoje.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>
          Total focado hoje:{" "}
          <span className="text-foreground font-semibold">{totalMinutes} min</span>
        </span>
      </div>

      <div className="space-y-1.5">
        {todaySessions
          .slice()
          .reverse()
          .map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
            >
              {session.completed ? (
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  {session.taskTitle ?? "Sem tarefa"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.durationMinutes} min ·{" "}
                  {session.completed ? "Concluída" : "Abandonada"}
                </p>
              </div>

              <span className="text-xs text-muted-foreground shrink-0 font-mono">
                {new Date(session.startedAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
