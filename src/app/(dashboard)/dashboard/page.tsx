import { DayHeader } from "@/components/dashboard/day-header";
import { DailyProgress } from "@/components/dashboard/daily-progress";
import { TodayTasks } from "@/components/dashboard/today-tasks";
import { TodayRoutine } from "@/components/dashboard/today-routine";
import { GamificationWidgets } from "@/components/dashboard/gamification-widgets";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
      {children}
    </h3>
  );
}

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-6xl">
      {/* ── Main column ────────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-6">
        <DayHeader />

        <section className="space-y-2">
          <SectionLabel>Progresso do dia</SectionLabel>
          <DailyProgress />
        </section>

        <section className="space-y-2">
          <SectionLabel>Tarefas de hoje</SectionLabel>
          <TodayTasks />
        </section>

        <section className="space-y-2">
          <SectionLabel>Rotina de hoje</SectionLabel>
          <TodayRoutine />
        </section>
      </div>

      {/* ── Sidebar column ─────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionLabel>Gamificação</SectionLabel>
        <GamificationWidgets />
      </div>
    </div>
  );
}
