"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/stores/taskStore";
import { useAppToast } from "@/lib/toast";
import { TaskStatus, TaskPriority } from "@/types";

export function InboxQuickCapture() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const createTask = useTaskStore((s) => s.createTask);
  const toast = useAppToast();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const title = value.trim();
    if (!title) return;

    setIsLoading(true);
    try {
      await createTask({
        title,
        status: TaskStatus.Inbox,
        priority: TaskPriority.Medium,
      });
      setValue("");
      toast.success("Tarefa capturada!", title);
    } catch {
      toast.error("Erro ao criar tarefa");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mb-2">
      <Plus className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Capturar tarefa…"
        disabled={isLoading}
        className="pl-8 h-8 text-sm bg-muted/50 border-dashed"
      />
    </div>
  );
}
