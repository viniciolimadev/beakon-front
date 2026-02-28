import { create } from "zustand";
import { Achievement, DashboardData } from "@/types/gamification";

interface GamificationState {
  xp: number;
  level: number;
  xpToNextLevel: number;
  streakDays: number;
  streakRecord: number;
  activeDays: string[];
  achievements: Achievement[];
  lastAchievement: Achievement | null;
  dashboard: DashboardData | null;
  isLoading: boolean;
  fetchDashboard: () => Promise<void>;
  addXP: (amount: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
}

function calcLevel(xp: number) {
  const level = Math.floor(xp / 500) + 1;
  const xpToNextLevel = level * 500 - xp;
  return { level, xpToNextLevel };
}

export const useGamificationStore = create<GamificationState>((set, get) => ({
  xp: 0,
  level: 1,
  xpToNextLevel: 500,
  streakDays: 0,
  streakRecord: 0,
  activeDays: [],
  achievements: [],
  lastAchievement: null,
  dashboard: null,
  isLoading: false,

  fetchDashboard: async () => {
    set({ isLoading: true });
    // TODO: chamar GET /api/gamification/dashboard em US-F19
    set({ isLoading: false });
  },

  addXP: (amount) => {
    const newXP = get().xp + amount;
    const { level, xpToNextLevel } = calcLevel(newXP);
    set({ xp: newXP, level, xpToNextLevel });
  },

  unlockAchievement: (achievement) => {
    set((state) => ({
      achievements: state.achievements.map((a) =>
        a.id === achievement.id
          ? { ...a, unlockedAt: new Date().toISOString() }
          : a
      ),
      lastAchievement: achievement,
    }));
  },
}));
