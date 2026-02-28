import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { QuickCapture } from "@/components/layout/quick-capture";
import { PomodoroTicker } from "@/components/pomodoro/pomodoro-ticker";
import { AchievementUnlockToast } from "@/components/achievements/achievement-unlock-toast";
import { XpFloatAnimation } from "@/components/shared/xp-float-animation";
import { PageTransition } from "@/components/layout/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <QuickCapture />
      <PomodoroTicker />
      <AchievementUnlockToast />
      <XpFloatAnimation />
    </div>
  );
}
