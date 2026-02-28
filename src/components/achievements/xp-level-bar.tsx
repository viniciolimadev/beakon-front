"use client";

import { Zap } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";

export function XpLevelBar() {
  const { xp, level, xpToNextLevel } = useGamificationStore();

  const xpForCurrentLevel = (level - 1) * 500;
  const xpInLevel = xp - xpForCurrentLevel;
  const percentage = Math.min(100, Math.round((xpInLevel / 500) * 100));

  return (
    <div className="rounded-xl border border-border bg-surface px-5 py-4 space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Level badge */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold">Nível {level}</p>
            <p className="text-xs text-muted-foreground">
              {xp.toLocaleString("pt-BR")} XP total
            </p>
          </div>
        </div>

        {/* Progress percent */}
        <div className="text-right">
          <p className="text-3xl font-bold tabular-nums text-gradient-xp">
            {percentage}%
          </p>
          <p className="text-xs text-muted-foreground">para o nível {level + 1}</p>
        </div>
      </div>

      {/* Progress bar with gradient + shimmer overlay */}
      <div className="space-y-1.5">
        <div className="relative h-3 w-full rounded-full bg-surface-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-xp-gradient transition-all duration-700 relative"
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 rounded-full animate-shimmer bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:200%_100%]" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          Faltam{" "}
          <span className="font-semibold text-foreground">
            {xpToNextLevel} XP
          </span>
        </p>
      </div>
    </div>
  );
}
