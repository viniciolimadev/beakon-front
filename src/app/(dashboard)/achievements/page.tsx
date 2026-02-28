"use client";

import { useEffect } from "react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { XpLevelBar } from "@/components/achievements/xp-level-bar";
import { StreakCalendar } from "@/components/achievements/streak-calendar";
import { AchievementGrid } from "@/components/achievements/achievement-grid";

export default function AchievementsPage() {
  const fetchDashboard = useGamificationStore((s) => s.fetchDashboard);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="space-y-6 max-w-4xl">
      <XpLevelBar />

      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Calendário de streak
        </h3>
        <StreakCalendar />
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Conquistas
        </h3>
        <AchievementGrid />
      </section>
    </div>
  );
}
