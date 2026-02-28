import { create } from "zustand";
import {
  Routine,
  CreateRoutinePayload,
  UpdateRoutinePayload,
} from "@/types/routine";
import api from "@/services/api";

interface RoutineState {
  routines: Routine[];
  isLoading: boolean;
  fetchRoutines: () => Promise<void>;
  createRoutine: (data: CreateRoutinePayload) => Promise<void>;
  updateRoutine: (id: string, data: UpdateRoutinePayload) => Promise<void>;
  toggleActive: (id: string) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
}

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: [],
  isLoading: false,

  fetchRoutines: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get<Routine[]>("/api/routines");
      set({ routines: res.data });
    } catch {
      // silently fail
    } finally {
      set({ isLoading: false });
    }
  },

  createRoutine: async (data: CreateRoutinePayload) => {
    const res = await api.post<Routine>("/api/routines", data);
    set((state) => ({
      routines: [...state.routines, res.data].sort(
        (a, b) => a.order - b.order
      ),
    }));
  },

  updateRoutine: async (id: string, data: UpdateRoutinePayload) => {
    set((state) => ({
      routines: state.routines.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    }));
    try {
      await api.patch(`/api/routines/${id}`, data);
    } catch {
      await get().fetchRoutines();
    }
  },

  toggleActive: async (id: string) => {
    const routine = get().routines.find((r) => r.id === id);
    if (!routine) return;
    await get().updateRoutine(id, { isActive: !routine.isActive });
  },

  deleteRoutine: async (id: string) => {
    const previous = get().routines;
    set((state) => ({ routines: state.routines.filter((r) => r.id !== id) }));
    try {
      await api.delete(`/api/routines/${id}`);
    } catch {
      set({ routines: previous });
    }
  },
}));
