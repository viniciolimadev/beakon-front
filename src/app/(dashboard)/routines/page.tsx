"use client";

import { useEffect, useState } from "react";
import { LayoutList, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoutineStore } from "@/stores/routineStore";
import { RoutineList } from "@/components/routines/routine-list";
import { WeeklyView } from "@/components/routines/weekly-view";
import { RoutineModal } from "@/components/routines/routine-modal";
import { Routine } from "@/types/routine";
import { cn } from "@/lib/utils";

type View = "list" | "weekly";

export default function RoutinesPage() {
  const fetchRoutines = useRoutineStore((s) => s.fetchRoutines);
  const [view, setView] = useState<View>("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  const handleEdit = (routine: Routine) => {
    setEditingRoutine(routine);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingRoutine(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <ViewButton
            active={view === "list"}
            onClick={() => setView("list")}
            icon={<LayoutList className="h-3.5 w-3.5" />}
            label="Lista"
          />
          <ViewButton
            active={view === "weekly"}
            onClick={() => setView("weekly")}
            icon={<CalendarDays className="h-3.5 w-3.5" />}
            label="Semana"
          />
        </div>

        <Button size="sm" onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1" />
          Nova rotina
        </Button>
      </div>

      {view === "list" ? (
        <RoutineList onEdit={handleEdit} onNew={handleNew} />
      ) : (
        <WeeklyView />
      )}

      <RoutineModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        routine={editingRoutine}
      />
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
