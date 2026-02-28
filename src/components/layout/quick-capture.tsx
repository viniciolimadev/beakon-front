"use client";

import { useEffect, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/stores/taskStore";
import { TaskStatus, TaskPriority } from "@/types";
import { useToast } from "@/hooks/use-toast";

export function QuickCapture() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const createTask = useTaskStore((s) => s.createTask);
  const { toast } = useToast();

  // Ctrl+K global listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto-focus on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setValue("");
    }
  }, [open]);

  const handleCreate = async () => {
    const title = value.trim();
    if (!title) return;

    await createTask({ title, status: TaskStatus.Inbox, priority: TaskPriority.Medium });
    toast({
      title: "Tarefa adicionada à inbox",
      description: title,
    });
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <PlusCircle className="h-4 w-4 text-primary" />
            Captura rápida
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <Input
            ref={inputRef}
            placeholder="O que você precisa fazer?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            Pressione <kbd className="rounded border border-border px-1 font-mono">Enter</kbd> para criar ·{" "}
            <kbd className="rounded border border-border px-1 font-mono">Esc</kbd> para cancelar
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
