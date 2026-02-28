"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TimerRing } from "@/components/pomodoro/timer-ring";
import { PomodoroControls } from "@/components/pomodoro/pomodoro-controls";
import { PomodoroSettings } from "@/components/pomodoro/pomodoro-settings";
import { SessionHistory } from "@/components/pomodoro/session-history";
import { useTaskStore } from "@/stores/taskStore";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { cn } from "@/lib/utils";

export default function PomodoroPage() {
  const searchParams = useSearchParams();
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const { mode } = usePomodoroStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _taskId = searchParams.get("taskId");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-5xl transition-all duration-1000",
      )}
    >
      {/* ── Timer column ──────────────────────────────────────── */}
      <div className="lg:col-span-2 flex flex-col items-center gap-6 pt-4">
        {/* Glow orb behind timer based on mode */}
        <div className="relative flex flex-col items-center gap-6">
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-3xl opacity-10 -z-10 scale-150",
              mode === "focus" ? "bg-primary" : "bg-success"
            )}
          />
          <TimerRing />
        </div>
        <PomodoroControls />
      </div>

      {/* ── Sidebar column ────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <PomodoroSettings />
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Histórico do dia
          </h3>
          <SessionHistory />
        </div>
      </div>
    </div>
  );
}
