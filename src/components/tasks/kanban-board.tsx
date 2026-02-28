"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";

import { useTaskStore } from "@/stores/taskStore";
import { Task, TaskStatus } from "@/types";
import { KanbanColumn } from "./kanban-column";
import { TaskModal } from "./task-modal";
import { useAppToast } from "@/lib/toast";
import { TaskCardSkeleton } from "@/components/shared/skeletons";

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: TaskStatus.Inbox, title: "Inbox" },
  { id: TaskStatus.Today, title: "Hoje" },
  { id: TaskStatus.ThisWeek, title: "Esta Semana" },
  { id: TaskStatus.Backlog, title: "Backlog" },
  { id: TaskStatus.Done, title: "Concluídas" },
];

const STATUSES = new Set(Object.values(TaskStatus));

function getTaskColumn(taskId: string, tasks: Task[]): TaskStatus | null {
  return tasks.find((t) => t.id === taskId)?.status ?? null;
}

export function KanbanBoard() {
  const router = useRouter();
  const { tasks, isLoading, fetchTasks, moveTask, reorderTask, deleteTask } =
    useTaskStore();
  const toast = useAppToast();

  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const task = localTasks.find((t) => t.id === active.id);
    setActiveTask(task ?? null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const activeColumn = getTaskColumn(activeId, localTasks);
    const isOverColumn = STATUSES.has(overId as TaskStatus);
    const overColumn = isOverColumn
      ? (overId as TaskStatus)
      : getTaskColumn(overId, localTasks);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setLocalTasks((prev) =>
      prev.map((t) => (t.id === activeId ? { ...t, status: overColumn } : t))
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) {
      setLocalTasks(tasks);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = getTaskColumn(activeId, localTasks);
    const isOverColumn = STATUSES.has(overId as TaskStatus);
    const overColumn = isOverColumn
      ? (overId as TaskStatus)
      : getTaskColumn(overId, localTasks);

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      moveTask(activeId, overColumn);
    } else {
      const colTasks = localTasks
        .filter((t) => t.status === activeColumn)
        .sort((a, b) => a.order - b.order);
      const activeIdx = colTasks.findIndex((t) => t.id === activeId);
      const overIdx = colTasks.findIndex((t) => t.id === overId);

      if (activeIdx !== -1 && overIdx !== -1 && activeIdx !== overIdx) {
        const reordered = arrayMove(colTasks, activeIdx, overIdx);
        setLocalTasks((prev) => {
          const others = prev.filter((t) => t.status !== activeColumn);
          return [...others, ...reordered];
        });
        reorderTask(activeId, overIdx);
      }
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    toast.success("Tarefa excluída");
  };

  const handleComplete = (id: string) => {
    moveTask(id, TaskStatus.Done);
    toast.success("Tarefa concluída! 🎉");
  };

  const handleMoveToToday = (id: string) => {
    moveTask(id, TaskStatus.Today);
    toast.success("Tarefa movida para hoje");
  };

  const handlePomodoro = (id: string) => {
    router.push(`/pomodoro?taskId=${id}`);
  };

  const getColumnTasks = useCallback(
    (status: TaskStatus) =>
      localTasks
        .filter((t) => t.status === status)
        .sort((a, b) => a.order - b.order),
    [localTasks]
  );

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div key={col.id} className="w-72 shrink-0 space-y-2">
            <div className="h-5 w-24 rounded bg-accent/50 animate-pulse mb-3" />
            {Array.from({ length: 2 }).map((_, i) => (
              <TaskCardSkeleton key={i} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={getColumnTasks(col.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMoveToToday={handleMoveToToday}
              onPomodoro={handlePomodoro}
              onComplete={handleComplete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="rotate-1 shadow-xl opacity-90 w-72 rounded-lg border border-primary/40 bg-card p-3 space-y-2">
              <span className="text-sm font-medium">{activeTask.title}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <TaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        task={editingTask}
      />
    </>
  );
}
