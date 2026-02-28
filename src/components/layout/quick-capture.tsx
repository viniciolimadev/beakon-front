"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

import { useTaskStore } from "@/stores/taskStore";
import { TaskStatus, TaskPriority } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function QuickCapture() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const createTask = useTaskStore((s) => s.createTask);
  const { toast } = useToast();

  // Ctrl+K / Cmd+K global listener
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

  // Auto-focus on open; reset on close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setValue("");
      setSaved(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleCreate = async () => {
    const title = value.trim();
    if (!title) return;

    setSaved(true);
    await createTask({ title, status: TaskStatus.Inbox, priority: TaskPriority.Medium });
    toast({ title: "Capturado!", description: title });

    // Brief green flash, then close
    setTimeout(() => setOpen(false), 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreate();
  };

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      {/* Modal */}
      <div className="animate-scale-in w-full max-w-lg rounded-xl border border-border bg-surface-elevated shadow-modal overflow-hidden">
        {/* Input area */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <Zap className="h-4 w-4 text-primary shrink-0" />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Capturar ideia... (Enter para salvar)"
              className={cn(
                "flex-1 bg-transparent text-lg text-foreground",
                "placeholder:text-muted-foreground/50",
                "outline-none border-none focus:ring-0",
                "transition-colors duration-200",
                saved && "text-success"
              )}
            />
          </div>

          {/* Subtle divider */}
          <div
            className={cn(
              "mt-3 h-px transition-colors duration-300",
              saved ? "bg-success/40" : value ? "bg-primary/30" : "bg-border"
            )}
          />
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-3 px-5 py-2.5 bg-surface border-t border-border text-xs text-muted-foreground">
          <span>
            <kbd className="inline-flex items-center rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px]">
              ↵
            </kbd>
            {" "}salvar
          </span>
          <span className="text-border">·</span>
          <span>
            <kbd className="inline-flex items-center rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>
            {" "}fechar
          </span>
          <span className="ml-auto text-muted-foreground/50">Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
