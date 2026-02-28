"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import { useRoutineStore } from "@/stores/routineStore";
import { useAppToast } from "@/lib/toast";
import { Routine, Weekday } from "@/types/routine";
import { cn } from "@/lib/utils";

const WEEKDAYS: { value: Weekday; label: string; short: string }[] = [
  { value: 0, label: "Domingo", short: "Dom" },
  { value: 1, label: "Segunda", short: "Seg" },
  { value: 2, label: "Terça", short: "Ter" },
  { value: 3, label: "Quarta", short: "Qua" },
  { value: 4, label: "Quinta", short: "Qui" },
  { value: 5, label: "Sexta", short: "Sex" },
  { value: 6, label: "Sábado", short: "Sáb" },
];

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  time: z.string().min(1, "Horário obrigatório"),
  weekdays: z.array(z.number()).min(1, "Selecione ao menos um dia"),
  order: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface RoutineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routine?: Routine | null;
}

export function RoutineModal({ open, onOpenChange, routine }: RoutineModalProps) {
  const { createRoutine, updateRoutine } = useRoutineStore();
  const toast = useAppToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      time: "07:00",
      weekdays: [1, 2, 3, 4, 5],
      order: "",
    },
  });

  const selectedDays = watch("weekdays");

  const timesPerWeek = useMemo(
    () => selectedDays?.length ?? 0,
    [selectedDays]
  );

  useEffect(() => {
    if (open) {
      reset(
        routine
          ? {
              title: routine.title,
              time: routine.time,
              weekdays: routine.weekdays,
              order: routine.order ? String(routine.order) : "",
            }
          : {
              title: "",
              time: "07:00",
              weekdays: [1, 2, 3, 4, 5],
              order: "",
            }
      );
    }
  }, [open, routine, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        title: values.title,
        time: values.time,
        weekdays: values.weekdays as Weekday[],
        order: values.order ? Number(values.order) : undefined,
      };

      if (routine) {
        await updateRoutine(routine.id, payload);
        toast.success("Rotina atualizada!");
      } else {
        await createRoutine(payload);
        toast.success("Rotina criada!");
      }
      onOpenChange(false);
    } catch {
      toast.error("Erro ao salvar rotina");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{routine ? "Editar rotina" : "Nova rotina"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Meditação matinal"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="time">Horário</Label>
              <Input id="time" type="time" {...register("time")} />
              {errors.time && (
                <p className="text-xs text-destructive">{errors.time.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="order">Ordem (opcional)</Label>
              <Input
                id="order"
                type="number"
                min={1}
                placeholder="ex: 1"
                {...register("order")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dias da semana</Label>
            <Controller
              name="weekdays"
              control={control}
              render={({ field }) => (
                <div className="flex gap-1.5 flex-wrap">
                  {WEEKDAYS.map((day) => {
                    const isSelected = field.value?.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => {
                          const next = isSelected
                            ? field.value.filter((d) => d !== day.value)
                            : [...(field.value ?? []), day.value];
                          field.onChange(next.sort());
                        }}
                        className={cn(
                          "text-xs px-2.5 py-1.5 rounded-full border transition-colors font-medium",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        )}
                      >
                        {day.short}
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.weekdays && (
              <p className="text-xs text-destructive">
                {errors.weekdays.message}
              </p>
            )}

            <p className="text-xs text-muted-foreground pt-1">
              {timesPerWeek === 0
                ? "Selecione ao menos um dia."
                : timesPerWeek === 7
                ? "Este item aparecerá todos os dias da semana."
                : `Este item aparecerá ${timesPerWeek} ${timesPerWeek === 1 ? "vez" : "vezes"} por semana.`}
            </p>
          </div>

          <DialogFooter className="pt-2">
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
              {routine ? "Salvar" : "Criar rotina"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
