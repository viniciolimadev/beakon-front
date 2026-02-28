"use client";

import { Zap } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";

export function XpLevelBar() {
  const { xp, level, xpToNextLevel } = useGamificationStore();

  const xpForCurrentLevel = (level - 1) * 500;
  const xpInLevel = xp - xpForCurrentLevel;
  const percentage = Math.min(100, Math.round((xpInLevel / 500) * 100));

  return (
    <div className="rounded-lg border border-border bg-card px-6 py-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Nível {level}</p>
            <p className="text-xs text-muted-foreground">{xp} XP total</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tabular-nums">{percentage}%</p>
          <p className="text-xs text-muted-foreground">para o nível {level + 1}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">
          Faltam <span className="text-foreground font-medium">{xpToNextLevel} XP</span>
        </p>
      </div>
    </div>
  );
}
