import { create } from "zustand";
import {
  Routine,
  CreateRoutinePayload,
  UpdateRoutinePayload,
  Weekday,
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

// Map backend response fields to frontend Routine type
function mapRoutine(item: {
  id: string;
  title: string;
  timeOfDay: string;
  daysOfWeek: number[];
  order: number;
  isActive: boolean;
  createdAt?: string;
}): Routine {
  return {
    id: item.id,
    title: item.title,
    time: item.timeOfDay,
    weekdays: item.daysOfWeek as Weekday[],
    order: item.order,
    isActive: item.isActive,
    createdAt: item.createdAt,
  };
}

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: [],
  isLoading: false,

  fetchRoutines: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/api/routines");
      const items = res.data.data;
      set({ routines: items.map(mapRoutine) });
    } catch {
      // silently fail
    } finally {
      set({ isLoading: false });
    }
  },

  createRoutine: async (data: CreateRoutinePayload) => {
    const res = await api.post("/api/routines", {
      title: data.title,
      time_of_day: data.time,
      days_of_week: data.weekdays,
      order: data.order ?? 0,
    });
    const item = mapRoutine(res.data.data);
    set((state) => ({
      routines: [...state.routines, item].sort((a, b) => a.order - b.order),
    }));
  },

  updateRoutine: async (id: string, data: UpdateRoutinePayload) => {
    const routine = get().routines.find((r) => r.id === id);
    if (!routine) return;
    // Optimistic update
    set((state) => ({
      routines: state.routines.map((r) => (r.id === id ? { ...r, ...data } : r)),
    }));
    try {
      await api.put(`/api/routines/${id}`, {
        title: data.title ?? routine.title,
        time_of_day: data.time ?? routine.time,
        days_of_week: data.weekdays ?? routine.weekdays,
        order: data.order ?? routine.order,
      });
    } catch {
      await get().fetchRoutines();
    }
  },

  toggleActive: async (id: string) => {
    const routine = get().routines.find((r) => r.id === id);
    if (!routine) return;
    // Optimistic update
    set((state) => ({
      routines: state.routines.map((r) =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      ),
    }));
    try {
      await api.patch(`/api/routines/${id}/toggle`);
    } catch {
      await get().fetchRoutines();
    }
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
