"use client";

import { useState } from "react";
import { Trophy, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamificationStore } from "@/stores/gamificationStore";
import { Achievement } from "@/types/gamification";
import { AchievementCardSkeleton } from "@/components/shared/skeletons";

type Filter = "all" | "unlocked" | "locked";

const FILTER_LABELS: Record<Filter, string> = {
  all: "Todas",
  unlocked: "Desbloqueadas",
  locked: "Bloqueadas",
};

export function AchievementGrid() {
  const { achievements, isLoading } = useGamificationStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = achievements.filter((a) => {
    if (filter === "unlocked") return !!a.unlockedAt;
    if (filter === "locked") return !a.unlockedAt;
    return true;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <AchievementCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
        {(["all", "unlocked", "locked"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "text-xs px-3 py-1.5 rounded font-medium transition-colors",
              filter === f
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Nenhuma conquista nesta categoria ainda.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const isUnlocked = !!achievement.unlockedAt;
  const progress = Math.min(100, Math.round((achievement.progress / achievement.target) * 100));

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 space-y-3 transition-opacity",
        !isUnlocked && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-lg",
            isUnlocked ? "bg-warning/10" : "bg-muted"
          )}
        >
          {isUnlocked ? (
            <span>{achievement.icon}</span>
          ) : (
            <Lock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold truncate">{achievement.title}</p>
            {isUnlocked && <Trophy className="h-3 w-3 text-warning shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isUnlocked ? "bg-warning" : "bg-primary/50"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {achievement.progress}/{achievement.target}
          </span>
          {isUnlocked ? (
            <span className="text-warning">
              +{achievement.xpReward} XP
            </span>
          ) : (
            <span>{progress}%</span>
          )}
        </div>
      </div>

      {isUnlocked && achievement.unlockedAt && (
        <p className="text-[10px] text-muted-foreground">
          Desbloqueada em{" "}
          {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  );
}
