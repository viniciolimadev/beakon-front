"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRoutineStore } from "@/stores/routineStore";
import { Routine, Weekday } from "@/types/routine";
import { useAppToast } from "@/lib/toast";
import { RoutineItemSkeleton } from "@/components/shared/skeletons";

const WEEKDAY_LABELS: Record<Weekday, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

const WEEKDAY_COLORS: Record<Weekday, string> = {
  0: "bg-destructive/10 text-destructive",
  1: "bg-primary/10 text-primary",
  2: "bg-primary/10 text-primary",
  3: "bg-primary/10 text-primary",
  4: "bg-primary/10 text-primary",
  5: "bg-primary/10 text-primary",
  6: "bg-warning/10 text-warning",
};

interface RoutineListProps {
  onEdit: (routine: Routine) => void;
  onNew: () => void;
}

export function RoutineList({ onEdit, onNew }: RoutineListProps) {
  const { routines, isLoading, toggleActive, deleteRoutine } = useRoutineStore();
  const toast = useAppToast();

  const handleDelete = async (id: string) => {
    await deleteRoutine(id);
    toast.success("Rotina excluída");
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <RoutineItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (routines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <p className="text-muted-foreground text-sm">
          Nenhuma rotina criada ainda.
        </p>
        <Button size="sm" onClick={onNew}>
          <Plus className="h-4 w-4 mr-1" />
          Criar minha primeira rotina
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {routines
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((routine) => (
          <RoutineItem
            key={routine.id}
            routine={routine}
            onEdit={onEdit}
            onToggle={() => toggleActive(routine.id)}
            onDelete={() => handleDelete(routine.id)}
          />
        ))}
    </div>
  );
}

interface RoutineItemProps {
  routine: Routine;
  onEdit: (routine: Routine) => void;
  onToggle: () => void;
  onDelete: () => void;
}

function RoutineItem({ routine, onEdit, onToggle, onDelete }: RoutineItemProps) {
  const today = new Date().getDay() as Weekday;
  const isToday = routine.weekdays.includes(today);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-4 py-3 transition-opacity",
        !routine.isActive && "opacity-50"
      )}
    >
      {/* Toggle */}
      <button
        onClick={onToggle}
        className={cn(
          "w-8 h-4 rounded-full relative transition-colors shrink-0",
          routine.isActive ? "bg-primary" : "bg-muted"
        )}
        aria-label={routine.isActive ? "Desativar" : "Ativar"}
      >
        <span
          className={cn(
            "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform shadow-sm",
            routine.isActive ? "translate-x-4 left-0.5" : "left-0.5"
          )}
        />
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{routine.title}</span>
          {isToday && (
            <span className="text-[10px] bg-primary/10 text-primary rounded-full px-1.5 py-0.5 shrink-0">
              Hoje
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span className="text-xs text-muted-foreground font-mono">
            {routine.time}
          </span>
          <span className="text-border text-xs">·</span>
          {routine.weekdays.map((day) => (
            <span
              key={day}
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-medium",
                WEEKDAY_COLORS[day]
              )}
            >
              {WEEKDAY_LABELS[day]}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground"
          onClick={() => onEdit(routine)}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
