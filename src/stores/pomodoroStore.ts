import { create } from "zustand";
import {
  PomodoroSession,
  PomodoroConfig,
  PomodoroMode,
  DEFAULT_POMODORO_CONFIG,
} from "@/types/pomodoro";

interface PomodoroState {
  session: PomodoroSession | null;
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number;
  cyclesCompleted: number;
  mode: PomodoroMode;
  config: PomodoroConfig;
  todaySessions: PomodoroSession[];
  start: (taskId?: string) => Promise<void>;
  pause: () => void;
  resume: () => void;
  finish: (completed: boolean) => Promise<void>;
  tick: () => void;
  nextMode: () => void;
  setConfig: (config: Partial<PomodoroConfig>) => void;
}

function getModeSeconds(mode: PomodoroMode, config: PomodoroConfig): number {
  const map: Record<PomodoroMode, number> = {
    focus: config.focusMinutes * 60,
    short_break: config.shortBreakMinutes * 60,
    long_break: config.longBreakMinutes * 60,
  };
  return map[mode];
}

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  session: null,
  isRunning: false,
  isPaused: false,
  timeRemaining: DEFAULT_POMODORO_CONFIG.focusMinutes * 60,
  cyclesCompleted: 0,
  mode: "focus",
  config: DEFAULT_POMODORO_CONFIG,
  todaySessions: [],

  start: async (taskId) => {
    const { config } = get();
    // TODO: chamar POST /api/pomodoro/start em US-F31
    set({
      isRunning: true,
      isPaused: false,
      mode: "focus",
      timeRemaining: config.focusMinutes * 60,
      session: {
        id: crypto.randomUUID(),
        taskId,
        durationMinutes: config.focusMinutes,
        completed: false,
        startedAt: new Date().toISOString(),
      },
    });
  },

  pause: () => set({ isRunning: false, isPaused: true }),

  resume: () => set({ isRunning: true, isPaused: false }),

  finish: async (completed) => {
    const { session, cyclesCompleted, config, todaySessions } = get();
    if (!session) return;

    const finished: PomodoroSession = {
      ...session,
      completed,
      finishedAt: new Date().toISOString(),
    };

    // TODO: chamar PATCH /api/pomodoro/{id}/finish em US-F31
    set({
      session: null,
      isRunning: false,
      isPaused: false,
      todaySessions: [...todaySessions, finished],
      cyclesCompleted: completed ? cyclesCompleted + 1 : cyclesCompleted,
    });
  },

  tick: () => {
    const { timeRemaining, isRunning } = get();
    if (!isRunning || timeRemaining <= 0) return;
    set({ timeRemaining: timeRemaining - 1 });
  },

  nextMode: () => {
    const { cyclesCompleted, config } = get();
    const isLongBreak =
      (cyclesCompleted + 1) % config.cyclesUntilLongBreak === 0;
    const nextMode: PomodoroMode = isLongBreak ? "long_break" : "short_break";
    set({
      mode: nextMode,
      timeRemaining: getModeSeconds(nextMode, config),
      isRunning: false,
      isPaused: false,
    });
  },

  setConfig: (partial) => {
    const config = { ...get().config, ...partial };
    set({ config });
    if (typeof window !== "undefined") {
      localStorage.setItem("pomodoroConfig", JSON.stringify(config));
    }
  },
}));
