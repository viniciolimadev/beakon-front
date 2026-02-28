"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TimerRing } from "@/components/pomodoro/timer-ring";
import { PomodoroControls } from "@/components/pomodoro/pomodoro-controls";
import { PomodoroSettings } from "@/components/pomodoro/pomodoro-settings";
import { SessionHistory } from "@/components/pomodoro/session-history";
import { useTaskStore } from "@/stores/taskStore";

export default function PomodoroPage() {
  const searchParams = useSearchParams();
  const fetchTasks = useTaskStore((s) => s.fetchTasks);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _taskId = searchParams.get("taskId");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
      <div className="lg:col-span-2 flex flex-col items-center gap-6 pt-4">
        <TimerRing />
        <PomodoroControls />
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <PomodoroSettings />
        </div>

        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <h3 className="text-sm font-semibold">Histórico do dia</h3>
          <SessionHistory />
        </div>
      </div>
    </div>
  );
}
