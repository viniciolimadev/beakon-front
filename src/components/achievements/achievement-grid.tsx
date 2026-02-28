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
      <div className="flex items-center gap-0.5 bg-surface rounded-lg p-1 w-fit border border-border">
        {(["all", "unlocked", "locked"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-200",
              filter === f
                ? "bg-surface-elevated text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-elevated">
            <Trophy className="h-6 w-6 text-muted-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {filter === "unlocked"
                ? "Nenhuma conquista desbloqueada ainda."
                : filter === "locked"
                ? "Todas as conquistas foram desbloqueadas! 🎉"
                : "Sua jornada começa com a primeira tarefa."}
            </p>
            {filter === "all" && (
              <p className="text-xs text-muted-foreground">
                Complete tarefas e sessões Pomodoro para ganhar conquistas.
              </p>
            )}
          </div>
        </div>
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
        "rounded-xl border p-4 space-y-3 transition-all duration-200",
        isUnlocked
          ? "bg-surface border-warning/30 shadow-glow-warning hover:border-warning/50 hover:-translate-y-0.5"
          : "bg-surface border-border opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-lg",
            isUnlocked
              ? "bg-warning/15 ring-2 ring-warning/20"
              : "bg-surface-elevated"
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
        <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
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
            <span className="text-warning font-medium">
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
