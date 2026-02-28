"use client";

import { useEffect } from "react";
import { Flame, Trophy, Zap } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { GamificationWidgetSkeleton } from "@/components/shared/skeletons";

export function GamificationWidgets() {
  const {
    xp,
    level,
    xpToNextLevel,
    streakDays,
    streakRecord,
    lastAchievement,
    isLoading,
    fetchDashboard,
  } = useGamificationStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <GamificationWidgetSkeleton />
        <GamificationWidgetSkeleton />
      </div>
    );
  }

  const xpForCurrentLevel = (level - 1) * 500;
  const xpInLevel = xp - xpForCurrentLevel;
  const xpNeededForLevel = 500;
  const xpPercentage = Math.min(
    100,
    Math.round((xpInLevel / xpNeededForLevel) * 100)
  );

  return (
    <div className="space-y-3">
      {/* XP + Level */}
      <div className="rounded-lg border border-border bg-card px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">Nível {level}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {xpToNextLevel} XP para o próximo
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-warning transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{xp} XP total</p>
      </div>

      {/* Streak */}
      <div className="rounded-lg border border-border bg-card px-4 py-3 flex items-center gap-3">
        <Flame className="h-5 w-5 text-danger shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{streakDays} dias seguidos</p>
          <p className="text-xs text-muted-foreground">
            Recorde: {streakRecord} dias
          </p>
        </div>
      </div>

      {/* Last Achievement */}
      {lastAchievement && (
        <div className="rounded-lg border border-border bg-card px-4 py-3 flex items-center gap-3">
          <Trophy className="h-5 w-5 text-warning shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Última conquista</p>
            <p className="text-sm font-medium truncate">{lastAchievement.title}</p>
          </div>
          <span className="text-xs text-warning shrink-0">
            +{lastAchievement.xpReward} XP
          </span>
        </div>
      )}
    </div>
  );
}
