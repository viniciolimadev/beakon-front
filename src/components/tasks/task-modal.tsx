"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/stores/taskStore";
import { useAppToast } from "@/lib/toast";
import { Task, TaskStatus, TaskPriority } from "@/types";

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  estimatedMinutes: z.string().optional(),
  dueDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

export function TaskModal({ open, onOpenChange, task }: TaskModalProps) {
  const { createTask, updateTask, deleteTask } = useTaskStore();
  const toast = useAppToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.Inbox,
      priority: TaskPriority.Medium,
      estimatedMinutes: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (open) {
      setConfirmDelete(false);
      reset(
        task
          ? {
              title: task.title,
              description: task.description ?? "",
              status: task.status,
              priority: task.priority,
              estimatedMinutes: task.estimatedMinutes
                ? String(task.estimatedMinutes)
                : "",
              dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
            }
          : {
              title: "",
              description: "",
              status: TaskStatus.Inbox,
              priority: TaskPriority.Medium,
              estimatedMinutes: "",
              dueDate: "",
            }
      );
    }
  }, [open, task, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        title: values.title,
        description: values.description || undefined,
        status: values.status,
        priority: values.priority,
        estimatedMinutes:
          values.estimatedMinutes && values.estimatedMinutes !== ""
            ? Number(values.estimatedMinutes)
            : undefined,
        dueDate: values.dueDate || undefined,
      };

      if (task) {
        await updateTask(task.id, payload);
        toast.success("Tarefa atualizada!");
      } else {
        await createTask(payload);
        toast.success("Tarefa criada!");
      }
      onOpenChange(false);
    } catch {
      toast.error("Erro ao salvar tarefa");
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      toast.success("Tarefa excluída");
      onOpenChange(false);
    } catch {
      toast.error("Erro ao excluir tarefa");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="O que precisa ser feito?"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Detalhes opcionais…"
              rows={3}
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <select id="status" className={selectClass} {...register("status")}>
                <option value={TaskStatus.Inbox}>Inbox</option>
                <option value={TaskStatus.Today}>Hoje</option>
                <option value={TaskStatus.ThisWeek}>Esta semana</option>
                <option value={TaskStatus.Backlog}>Backlog</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="priority">Prioridade</Label>
              <select id="priority" className={selectClass} {...register("priority")}>
                <option value={TaskPriority.Low}>Baixa</option>
                <option value={TaskPriority.Medium}>Média</option>
                <option value={TaskPriority.High}>Alta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="estimatedMinutes">Tempo estimado (min)</Label>
              <Input
                id="estimatedMinutes"
                type="number"
                min={1}
                placeholder="ex: 25"
                {...register("estimatedMinutes")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dueDate">Prazo</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} />
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
            {task && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting || isSubmitting}
                className="sm:mr-auto"
              >
                {isDeleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                )}
                {confirmDelete ? "Confirmar exclusão" : "Excluir"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
              )}
              {task ? "Salvar" : "Criar tarefa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
