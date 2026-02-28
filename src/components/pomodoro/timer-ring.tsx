"use client";

import { usePomodoroStore } from "@/stores/pomodoroStore";

const MODE_COLORS = {
  focus: "hsl(var(--primary))",
  short_break: "hsl(var(--success))",
  long_break: "hsl(var(--warning))",
} as const;

const MODE_LABELS = {
  focus: "Foco",
  short_break: "Pausa curta",
  long_break: "Pausa longa",
} as const;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const SIZE = 240;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerRing() {
  const { timeRemaining, mode, config, isRunning, isPaused } =
    usePomodoroStore();

  const totalSeconds = (() => {
    if (mode === "focus") return config.focusMinutes * 60;
    if (mode === "short_break") return config.shortBreakMinutes * 60;
    return config.longBreakMinutes * 60;
  })();

  const progress = timeRemaining / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const color = MODE_COLORS[mode];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.4s ease" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-bold tabular-nums" suppressHydrationWarning>
            {formatTime(timeRemaining)}
          </span>
          <span className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">
            {isRunning ? MODE_LABELS[mode] : isPaused ? "Pausado" : MODE_LABELS[mode]}
          </span>
        </div>
      </div>
    </div>
  );
}

export { formatTime };
