import { DayHeader } from "@/components/dashboard/day-header";
import { DailyProgress } from "@/components/dashboard/daily-progress";
import { TodayTasks } from "@/components/dashboard/today-tasks";
import { TodayRoutine } from "@/components/dashboard/today-routine";
import { GamificationWidgets } from "@/components/dashboard/gamification-widgets";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main column */}
      <div className="lg:col-span-2 space-y-6">
        <DayHeader />

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Progresso do dia
          </h3>
          <DailyProgress />
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Tarefas de hoje
          </h3>
          <TodayTasks />
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Rotina de hoje
          </h3>
          <TodayRoutine />
        </section>
      </div>

      {/* Sidebar column */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Gamificação
        </h3>
        <GamificationWidgets />
      </div>
    </div>
  );
}
