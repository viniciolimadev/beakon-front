"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTaskStore } from "@/stores/taskStore";
import { TaskPriority } from "@/types";

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: TaskPriority.Low, label: "Baixa" },
  { value: TaskPriority.Medium, label: "Média" },
  { value: TaskPriority.High, label: "Alta" },
];

const DATE_RANGES: {
  value: "today" | "this_week" | "overdue";
  label: string;
}[] = [
  { value: "today", label: "Hoje" },
  { value: "this_week", label: "Esta semana" },
  { value: "overdue", label: "Vencidas" },
];

export function TaskFilters() {
  const { filters, setFilters, clearFilters } = useTaskStore();

  const activeCount =
    filters.priorities.length + (filters.dueDateRange ? 1 : 0);

  const togglePriority = (priority: TaskPriority) => {
    const current = filters.priorities;
    const next = current.includes(priority)
      ? current.filter((p) => p !== priority)
      : [...current, priority];
    setFilters({ priorities: next });
  };

  const toggleDateRange = (range: "today" | "this_week" | "overdue") => {
    setFilters({
      dueDateRange: filters.dueDateRange === range ? null : range,
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground font-medium shrink-0">
        Filtrar:
      </span>

      {PRIORITIES.map((p) => (
        <button
          key={p.value}
          onClick={() => togglePriority(p.value)}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full border transition-colors",
            filters.priorities.includes(p.value)
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-border/80"
          )}
        >
          {p.label}
        </button>
      ))}

      <span className="text-border">|</span>

      {DATE_RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => toggleDateRange(r.value)}
          className={cn(
            "text-xs px-2.5 py-1 rounded-full border transition-colors",
            filters.dueDateRange === r.value
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-border/80"
          )}
        >
          {r.label}
        </button>
      ))}

      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs text-muted-foreground px-2"
          onClick={clearFilters}
        >
          <X className="h-3 w-3 mr-1" />
          Limpar
          <Badge variant="secondary" className="ml-1.5 h-4 text-[10px] px-1">
            {activeCount}
          </Badge>
        </Button>
      )}
    </div>
  );
}
