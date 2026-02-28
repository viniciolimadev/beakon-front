import * as React from "react";
import {
  Inbox,
  CalendarCheck,
  CalendarDays,
  Trophy,
  Timer,
  Search,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

/* ── Pre-configured empty state presets ─────────────────────────── */
const PRESETS: Record<
  string,
  { icon: LucideIcon; title: string; description: string }
> = {
  inbox: {
    icon: Inbox,
    title: "Inbox vazio",
    description: "Capture sua próxima ideia ou tarefa aqui.",
  },
  today: {
    icon: CalendarCheck,
    title: "Nada para hoje",
    description: "Sua agenda de hoje está limpa. Que tal planejar algo?",
  },
  routines: {
    icon: CalendarDays,
    title: "Sem rotinas",
    description: "Crie sua primeira rotina para estruturar o seu dia.",
  },
  achievements: {
    icon: Trophy,
    title: "Nenhuma conquista",
    description: "Complete tarefas e sessões Pomodoro para ganhar conquistas.",
  },
  pomodoro: {
    icon: Timer,
    title: "Nenhuma sessão hoje",
    description: "Inicie seu primeiro Pomodoro para começar a focar.",
  },
  search: {
    icon: Search,
    title: "Nenhum resultado",
    description: "Tente ajustar os filtros ou usar outra busca.",
  },
};

export interface EmptyStateProps {
  /** Use a preset for common contexts */
  preset?: keyof typeof PRESETS;
  /** Custom icon (overrides preset) */
  icon?: LucideIcon;
  /** Main title */
  title?: string;
  /** Supporting description */
  description?: string;
  /** Call-to-action button label */
  actionLabel?: string;
  /** Call-to-action button variant */
  actionVariant?: ButtonProps["variant"];
  /** Call-to-action handler */
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  preset,
  icon: IconProp,
  title,
  description,
  actionLabel,
  actionVariant = "ghost",
  onAction,
  className,
}: EmptyStateProps) {
  const config = preset ? PRESETS[preset] : undefined;
  const Icon = IconProp ?? config?.icon;
  const resolvedTitle = title ?? config?.title ?? "Nada aqui";
  const resolvedDesc = description ?? config?.description;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className
      )}
    >
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-elevated">
          <Icon className="h-6 w-6 text-muted-foreground/60" />
        </div>
      )}

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{resolvedTitle}</p>
        {resolvedDesc && (
          <p className="text-xs text-muted-foreground max-w-[240px]">
            {resolvedDesc}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <Button variant={actionVariant} size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
