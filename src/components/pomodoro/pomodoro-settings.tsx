"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { useAppToast } from "@/lib/toast";

export function PomodoroSettings() {
  const { config, setConfig, isRunning } = usePomodoroStore();
  const toast = useAppToast();

  const [form, setForm] = useState({
    focusMinutes: String(config.focusMinutes),
    shortBreakMinutes: String(config.shortBreakMinutes),
    longBreakMinutes: String(config.longBreakMinutes),
    cyclesUntilLongBreak: String(config.cyclesUntilLongBreak),
  });

  const handleSave = () => {
    setConfig({
      focusMinutes: Math.max(1, Number(form.focusMinutes) || 25),
      shortBreakMinutes: Math.max(1, Number(form.shortBreakMinutes) || 5),
      longBreakMinutes: Math.max(1, Number(form.longBreakMinutes) || 15),
      cyclesUntilLongBreak: Math.max(1, Number(form.cyclesUntilLongBreak) || 4),
    });
    toast.success(
      isRunning
        ? "Configurações salvas! Aplicadas no próximo ciclo."
        : "Configurações salvas!"
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Configurações</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="focusMinutes">Foco (min)</Label>
          <Input
            id="focusMinutes"
            type="number"
            min={1}
            max={90}
            value={form.focusMinutes}
            onChange={(e) => setForm((f) => ({ ...f, focusMinutes: e.target.value }))}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="shortBreak">Pausa curta (min)</Label>
          <Input
            id="shortBreak"
            type="number"
            min={1}
            max={30}
            value={form.shortBreakMinutes}
            onChange={(e) =>
              setForm((f) => ({ ...f, shortBreakMinutes: e.target.value }))
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="longBreak">Pausa longa (min)</Label>
          <Input
            id="longBreak"
            type="number"
            min={1}
            max={60}
            value={form.longBreakMinutes}
            onChange={(e) =>
              setForm((f) => ({ ...f, longBreakMinutes: e.target.value }))
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cycles">Ciclos até pausa longa</Label>
          <Input
            id="cycles"
            type="number"
            min={1}
            max={10}
            value={form.cyclesUntilLongBreak}
            onChange={(e) =>
              setForm((f) => ({ ...f, cyclesUntilLongBreak: e.target.value }))
            }
          />
        </div>
      </div>

      <Button size="sm" onClick={handleSave} className="w-full">
        <Check className="h-3.5 w-3.5 mr-1" />
        Salvar configurações
      </Button>

      {isRunning && (
        <p className="text-xs text-muted-foreground text-center">
          As alterações serão aplicadas no próximo ciclo.
        </p>
      )}
    </div>
  );
}
