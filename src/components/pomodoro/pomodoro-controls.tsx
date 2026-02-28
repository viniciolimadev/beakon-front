"use client";

import { useState } from "react";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { useTaskStore } from "@/stores/taskStore";
import { TaskStatus } from "@/types";

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function PomodoroControls() {
  const {
    isRunning,
    isPaused,
    session,
    cyclesCompleted,
    config,
    start,
    pause,
    resume,
    finish,
  } = usePomodoroStore();

  const tasks = useTaskStore((s) => s.tasks);
  const todayTasks = tasks.filter(
    (t) => t.status === TaskStatus.Today || t.status === TaskStatus.ThisWeek
  );

  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const isActive = isRunning || isPaused;

  const handleStart = async () => {
    if (isActive) return;
    const task = todayTasks.find((t) => t.id === selectedTaskId);
    await start(task?.id, task?.title);
  };

  const handleAbandon = async () => {
    await finish(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      {/* Cycle counter */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        {Array.from({ length: config.cyclesUntilLongBreak }).map((_, i) => (
          <span
            key={i}
            className={i < cyclesCompleted % config.cyclesUntilLongBreak || (cyclesCompleted > 0 && cyclesCompleted % config.cyclesUntilLongBreak === 0) ? "text-base" : "opacity-30 text-base"}
          >
            🍅
          </span>
        ))}
        <span className="ml-1 tabular-nums">
          {cyclesCompleted % config.cyclesUntilLongBreak}/{config.cyclesUntilLongBreak}
        </span>
      </div>

      {/* Task selector */}
      {!isActive && (
        <select
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          className={selectClass}
        >
          <option value="">Sem tarefa vinculada</option>
          {todayTasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      )}

      {session?.taskTitle && (
        <p className="text-xs text-muted-foreground text-center">
          Focando em:{" "}
          <span className="text-foreground font-medium">{session.taskTitle}</span>
        </p>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {!isActive && (
          <Button size="lg" onClick={handleStart} className="px-8">
            <Play className="h-4 w-4 mr-2" />
            Iniciar
          </Button>
        )}

        {isRunning && (
          <Button size="lg" variant="outline" onClick={pause} className="px-8">
            <Pause className="h-4 w-4 mr-2" />
            Pausar
          </Button>
        )}

        {isPaused && (
          <Button size="lg" onClick={resume} className="px-8">
            <Play className="h-4 w-4 mr-2" />
            Retomar
          </Button>
        )}

        {isActive && (
          <Button
            size="lg"
            variant="destructive"
            onClick={handleAbandon}
          >
            <Square className="h-4 w-4 mr-2" />
            Abandonar
          </Button>
        )}
      </div>
    </div>
  );
}
