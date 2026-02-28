"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Timer,
  Trophy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useGamificationStore } from "@/stores/gamificationStore";
import { logoutRequest } from "@/services/authService";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tarefas", icon: CheckSquare },
  { href: "/routines", label: "Rotinas", icon: Calendar },
  { href: "/pomodoro", label: "Pomodoro", icon: Timer },
  { href: "/achievements", label: "Conquistas", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const { xp, streakDays } = useGamificationStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
        aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <span className="text-xl font-bold text-primary">
          {collapsed ? "B" : "Beakon"}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center justify-between rounded-md bg-accent/50 px-3 py-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-warning" />
              {xp} XP
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-danger" />
              {streakDays}d
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={cn(
            "w-full text-muted-foreground hover:text-foreground",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="ml-2">Sair</span>}
        </Button>
      </div>
    </aside>
  );
}
