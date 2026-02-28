import { create } from "zustand";
import { Achievement, DashboardData } from "@/types/gamification";
import api from "@/services/api";

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
    try {
      const [dashRes, achievRes] = await Promise.all([
        api.get<DashboardData>("/api/gamification/dashboard"),
        api.get<Achievement[]>("/api/gamification/achievements"),
      ]);
      const data = dashRes.data;
      const { level, xpToNextLevel } = calcLevel(data.xp);
      set({
        xp: data.xp,
        level,
        xpToNextLevel,
        streakDays: data.streakDays,
        streakRecord: data.streakRecord,
        activeDays: data.activeDays,
        lastAchievement: data.lastAchievement ?? null,
        dashboard: data,
        achievements: achievRes.data,
      });
    } catch {
      // silently fail — keeps existing state
    } finally {
      set({ isLoading: false });
    }
  },

  addXP: (amount: number) => {
    const prev = get();
    const newXP = prev.xp + amount;
    const { level, xpToNextLevel } = calcLevel(newXP);
    const leveledUp = level > prev.level;
    set({ xp: newXP, level, xpToNextLevel });
    return leveledUp;
  },

  unlockAchievement: (achievement: Achievement) => {
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
