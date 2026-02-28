"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskModal } from "@/components/tasks/task-modal";

export default function TasksPage() {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <TaskFilters />
        <Button size="sm" onClick={() => setIsNewTaskOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Nova tarefa
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>

      <TaskModal
        open={isNewTaskOpen}
        onOpenChange={setIsNewTaskOpen}
        task={null}
      />
    </div>
  );
}
