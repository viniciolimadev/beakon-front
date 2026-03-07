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

// Map backend achievement shape to frontend Achievement type
function mapAchievement(a: {
  key: string;
  name: string;
  description: string;
  xp_bonus: number;
  unlocked: boolean;
  unlocked_at?: string;
}): Achievement {
  return {
    id: a.key,
    key: a.key,
    title: a.name,
    description: a.description,
    xpReward: a.xp_bonus,
    unlocked: a.unlocked,
    unlockedAt: a.unlocked_at,
  };
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
        api.get("/api/gamification/dashboard"),
        api.get("/api/gamification/achievements"),
      ]);

      // Backend wraps all responses in { data: ..., message: '' }
      const raw: DashboardData = dashRes.data.data;
      const achievList = achievRes.data.data as Parameters<typeof mapAchievement>[0][];

      const { level, xpToNextLevel } = calcLevel(raw.xp);

      const lastRaw = raw.recent_achievements?.[0] ?? null;
      const lastAchievement: Achievement | null = lastRaw
        ? {
            id: lastRaw.key,
            key: lastRaw.key,
            title: lastRaw.name,
            description: "",
            xpReward: lastRaw.xp_bonus,
            unlocked: true,
            unlockedAt: lastRaw.unlocked_at,
          }
        : null;

      set({
        xp: raw.xp,
        level,
        xpToNextLevel,
        streakDays: raw.streak_days,
        streakRecord: raw.streak_days,
        activeDays: [],
        lastAchievement,
        dashboard: raw,
        achievements: achievList.map(mapAchievement),
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
