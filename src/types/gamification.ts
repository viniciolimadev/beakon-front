export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon?: string;
  xpReward: number;
  target?: number;
  progress?: number;
  unlocked: boolean;
  unlockedAt?: string;
}

// Shape returned by GET /api/gamification/dashboard
export interface DashboardData {
  xp: number;
  streak_days: number;
  achievements_unlocked: number;
  achievements_total: number;
  tasks_completed_today: number;
  minutes_focused_today: number;
  recent_achievements: Array<{
    key: string;
    name: string;
    xp_bonus: number;
    unlocked_at: string;
  }>;
}
