export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  target: number;
  progress: number;
  unlockedAt?: string;
}

export interface DashboardData {
  xp: number;
  level: number;
  xpToNextLevel: number;
  streakDays: number;
  streakRecord: number;
  activeDays: string[];
  lastAchievement?: Achievement;
  focusMinutesToday: number;
  tasksCompletedToday: number;
  tasksTotalToday: number;
}
