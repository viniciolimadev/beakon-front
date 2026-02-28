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
      <div className="rounded-xl border border-border bg-surface px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-warning/10">
              <Zap className="h-3.5 w-3.5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-semibold">Nível {level}</p>
              <p className="text-[10px] text-muted-foreground">
                {xp.toLocaleString("pt-BR")} XP total
              </p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground text-right">
            {xpToNextLevel} XP<br />
            <span className="text-muted-foreground/60">próximo nível</span>
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-xp-gradient transition-all duration-700"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="rounded-xl border border-border bg-surface px-4 py-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-danger/10 shrink-0">
          <Flame className="h-4 w-4 text-danger" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">
            <span className="font-mono tabular-nums">{streakDays}</span> dias seguidos
          </p>
          <p className="text-xs text-muted-foreground">
            Recorde: <span className="font-mono">{streakRecord}</span> dias
          </p>
        </div>
      </div>

      {/* Last Achievement */}
      {lastAchievement && (
        <div className="rounded-xl border border-warning/20 bg-warning/5 px-4 py-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/15 shrink-0 text-lg">
            {lastAchievement.icon ?? "🏆"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Última conquista
            </p>
            <p className="text-sm font-semibold truncate">{lastAchievement.title}</p>
          </div>
          <span className="text-xs font-medium text-warning shrink-0">
            +{lastAchievement.xpReward} XP
          </span>
        </div>
      )}
    </div>
  );
}
