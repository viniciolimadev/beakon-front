import { create } from "zustand";
import {
  PomodoroSession,
  PomodoroConfig,
  PomodoroMode,
  DEFAULT_POMODORO_CONFIG,
} from "@/types/pomodoro";
import api from "@/services/api";

interface PomodoroState {
  session: PomodoroSession | null;
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number;
  cyclesCompleted: number;
  mode: PomodoroMode;
  config: PomodoroConfig;
  todaySessions: PomodoroSession[];
  start: (taskId?: string, taskTitle?: string) => Promise<void>;
  startBreak: () => void;
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

function loadConfig(): PomodoroConfig {
  if (typeof window === "undefined") return DEFAULT_POMODORO_CONFIG;
  try {
    const stored = localStorage.getItem("pomodoroConfig");
    return stored
      ? { ...DEFAULT_POMODORO_CONFIG, ...JSON.parse(stored) }
      : DEFAULT_POMODORO_CONFIG;
  } catch {
    return DEFAULT_POMODORO_CONFIG;
  }
}

const initialConfig = loadConfig();

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  session: null,
  isRunning: false,
  isPaused: false,
  timeRemaining: initialConfig.focusMinutes * 60,
  cyclesCompleted: 0,
  mode: "focus",
  config: initialConfig,
  todaySessions: [],

  start: async (taskId?: string, taskTitle?: string) => {
    const { config } = get();
    try {
      const res = await api.post<{ id: string }>("/api/pomodoro/start", {
        taskId,
        durationMinutes: config.focusMinutes,
      });
      set({
        isRunning: true,
        isPaused: false,
        mode: "focus",
        timeRemaining: config.focusMinutes * 60,
        session: {
          id: res.data.id,
          taskId,
          taskTitle,
          durationMinutes: config.focusMinutes,
          completed: false,
          startedAt: new Date().toISOString(),
        },
      });
    } catch {
      // fallback: use local ID when API is unavailable
      set({
        isRunning: true,
        isPaused: false,
        mode: "focus",
        timeRemaining: config.focusMinutes * 60,
        session: {
          id: crypto.randomUUID(),
          taskId,
          taskTitle,
          durationMinutes: config.focusMinutes,
          completed: false,
          startedAt: new Date().toISOString(),
        },
      });
    }
  },

  startBreak: () => {
    const { cyclesCompleted, config } = get();
    const isLongBreak =
      (cyclesCompleted % config.cyclesUntilLongBreak === 0) &&
      cyclesCompleted > 0;
    const breakMode: PomodoroMode = isLongBreak ? "long_break" : "short_break";
    set({
      mode: breakMode,
      timeRemaining: getModeSeconds(breakMode, config),
      isRunning: true,
      isPaused: false,
      session: null,
    });
  },

  pause: () => set({ isRunning: false, isPaused: true }),

  resume: () => set({ isRunning: true, isPaused: false }),

  finish: async (completed: boolean) => {
    const { session, cyclesCompleted, todaySessions } = get();
    if (!session) return;

    const finished: PomodoroSession = {
      ...session,
      completed,
      finishedAt: new Date().toISOString(),
    };

    try {
      await api.patch(`/api/pomodoro/${session.id}/finish`, { completed });
    } catch {
      // continue locally even if API fails
    }

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
    const { config } = get();
    set({
      mode: "focus",
      timeRemaining: getModeSeconds("focus", config),
      isRunning: false,
      isPaused: false,
      session: null,
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
