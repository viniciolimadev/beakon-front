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

const XP_PER_LEVEL = 500;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const { xp, level, streakDays } = useGamificationStore();
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  const xpInLevel = xp % XP_PER_LEVEL;
  const xpProgress = Math.round((xpInLevel / XP_PER_LEVEL) * 100);

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r border-border bg-surface",
        "transition-[width] duration-300 ease-in-out shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Collapse toggle — chevron rotates */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={cn(
          "absolute -right-3 top-5 z-10",
          "flex h-6 w-6 items-center justify-center",
          "rounded-full border border-border bg-surface shadow-card",
          "text-muted-foreground hover:text-foreground transition-all duration-300",
          collapsed && "rotate-180"
        )}
        aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
      >
        <ChevronLeft className="h-3 w-3" />
      </button>

      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-4 overflow-hidden">
        <span
          className={cn(
            "font-bold tracking-tight transition-all duration-300 whitespace-nowrap",
            collapsed ? "text-lg text-primary" : "text-xl text-gradient-brand"
          )}
        >
          {collapsed ? "B" : "Beakon"}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 p-2 overflow-hidden">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg py-2 text-sm font-medium",
                "transition-colors duration-150",
                "border-l-2 pl-2.5",
                isActive
                  ? "bg-primary/10 text-primary border-l-primary"
                  : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground border-l-transparent"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <span className="truncate">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-3">
        {/* XP mini bar + streak */}
        {!collapsed && (
          <div className="space-y-1.5 px-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground font-medium">
                <Zap className="h-3 w-3 text-warning" />
                {xp.toLocaleString("pt-BR")} XP
              </span>
              <span className="text-muted-foreground/60 font-mono">Nv {level}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-surface-elevated overflow-hidden">
              <div
                className="h-full rounded-full bg-xp-gradient transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3 text-danger" />
              <span className="font-mono tabular-nums font-medium">{streakDays}</span>
              <span className="text-muted-foreground/60">dias seguidos</span>
            </div>
          </div>
        )}

        {/* Logout */}
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
          {!collapsed && <span className="ml-1">Sair</span>}
        </Button>
      </div>
    </aside>
  );
}
