"use client";

import { usePathname, useRouter } from "next/navigation";
import { Flame, Zap, LogOut, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <h1 className="text-lg font-semibold text-foreground">
        {getPageName(pathname)}
      </h1>

      <div className="flex items-center gap-4">
        {/* Mini-player */}
        {(isRunning || isPaused) && (
          <button
            onClick={() => router.push("/pomodoro")}
            className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            <span>{isRunning ? "🍅" : "⏸"}</span>
            <span className="font-mono tabular-nums" suppressHydrationWarning>
              {formatTime(timeRemaining)}
            </span>
            {session?.taskTitle && (
              <span className="max-w-24 truncate text-primary/70">
                {session.taskTitle}
              </span>
            )}
          </button>
        )}

        <Badge
          variant="secondary"
          className="gap-1 bg-primary/10 text-primary hover:bg-primary/20"
        >
          <Zap className="h-3 w-3" />
          {xp} XP
        </Badge>

        <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <Flame className="h-4 w-4 text-danger" />
          {streakDays}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user ? getInitials(user.name) : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {user && (
              <>
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-muted-foreground cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
