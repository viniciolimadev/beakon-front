"use client";

import { usePathname, useRouter } from "next/navigation";
import { Flame, Zap, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { useGamificationStore } from "@/stores/gamificationStore";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { logoutRequest } from "@/services/authService";
import { formatTime } from "@/components/pomodoro/timer-ring";
import { cn } from "@/lib/utils";

const PAGE_NAMES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tarefas",
  "/routines": "Rotinas",
  "/pomodoro": "Pomodoro",
  "/achievements": "Conquistas",
};

function getPageName(pathname: string): string {
  const match = Object.keys(PAGE_NAMES).find((key) =>
    pathname.startsWith(key)
  );
  return match ? PAGE_NAMES[match] : "Beakon";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { xp, streakDays } = useGamificationStore();
  const { isRunning, isPaused, timeRemaining, session } = usePomodoroStore();

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between",
        "border-b border-border px-6",
        "bg-background/80 backdrop-blur-sm"
      )}
    >
      {/* Page title */}
      <h1 className="text-base font-semibold text-foreground tracking-tight">
        {getPageName(pathname)}
      </h1>

      <div className="flex items-center gap-3">
        {/* Pomodoro mini-player */}
        {(isRunning || isPaused) && (
          <button
            onClick={() => router.push("/pomodoro")}
            className={cn(
              "flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5",
              "bg-primary/10 text-primary border border-primary/20",
              "hover:bg-primary/20 transition-colors duration-200"
            )}
          >
            <span>{isRunning ? "🍅" : "⏸"}</span>
            <span className="font-mono tabular-nums" suppressHydrationWarning>
              {formatTime(timeRemaining)}
            </span>
            {session?.taskTitle && (
              <span className="max-w-24 truncate text-primary/70 hidden sm:block">
                · {session.taskTitle}
              </span>
            )}
          </button>
        )}

        {/* XP badge */}
        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-warning" />
          <span className="font-mono tabular-nums">{xp.toLocaleString("pt-BR")}</span>
          <span className="text-muted-foreground/60 hidden sm:inline">XP</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Flame className="h-3.5 w-3.5 text-danger" />
          <span className="font-mono tabular-nums">{streakDays}</span>
        </div>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border hover:ring-primary/40 transition-all duration-200">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {user ? getInitials(user.name) : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 bg-surface-elevated border-border">
            {user && (
              <>
                <div className="px-2 py-2">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-muted-foreground cursor-pointer hover:text-foreground gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
