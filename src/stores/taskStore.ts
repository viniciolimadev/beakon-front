import { create } from "zustand";
import { Task, TaskStatus, CreateTaskPayload, UpdateTaskPayload } from "@/types/task";
import api from "@/services/api";

interface TaskFilters {
  priorities: string[];
  dueDateRange: "today" | "this_week" | "overdue" | null;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  filters: TaskFilters;
  fetchTasks: (filters?: Partial<TaskFilters>) => Promise<void>;
  createTask: (data: CreateTaskPayload) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskPayload) => Promise<void>;
  moveTask: (id: string, status: TaskStatus) => Promise<void>;
  reorderTask: (id: string, order: number) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskFilters>) => void;
  clearFilters: () => void;
}

const DEFAULT_FILTERS: TaskFilters = {
  priorities: [],
  dueDateRange: null,
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  filters: DEFAULT_FILTERS,

  fetchTasks: async (filters?: Partial<TaskFilters>) => {
    set({ isLoading: true });
    try {
      const activeFilters = { ...get().filters, ...filters };
      const params = new URLSearchParams();
      activeFilters.priorities.forEach((p) => params.append("priority", p));
      if (activeFilters.dueDateRange) {
        params.set("dueDateRange", activeFilters.dueDateRange);
      }
      const res = await api.get<{ data: { items: Task[]; total: number } }>(`/api/tasks?${params.toString()}`);
      set({ tasks: res.data.data.items || [] });
    } catch {
      // silently fail — keeps existing tasks when API is unavailable
    } finally {
      set({ isLoading: false });
    }
  },

  createTask: async (data: CreateTaskPayload) => {
    const payload = {
      ...data,
      estimated_minutes: data.estimatedMinutes,
      due_date: data.dueDate,
    };
    const res = await api.post<{ data: Task }>("/api/tasks", payload);
    set((state) => ({ tasks: [...state.tasks, res.data.data] }));
  },

  updateTask: async (id: string, data: UpdateTaskPayload) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
    }));
    try {
      const payload = {
        ...data,
        estimated_minutes: data.estimatedMinutes,
        due_date: data.dueDate,
      };
      await api.put(`/api/tasks/${id}`, payload);
    } catch {
      await get().fetchTasks();
    }
  },

  moveTask: async (id: string, status: TaskStatus) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
    try {
      await api.patch(`/api/tasks/${id}/status`, { status });
    } catch {
      await get().fetchTasks();
    }
  },

  reorderTask: async (id: string, order: number) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, sortOrder: order } : t)),
    }));
    try {
      await api.patch(`/api/tasks/${id}/reorder`, { order });
    } catch {
      await get().fetchTasks();
    }
  },

  completeTask: async (id: string) => {
    await get().moveTask(id, TaskStatus.Done);
  },

  deleteTask: async (id: string) => {
    const previous = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    try {
      await api.delete(`/api/tasks/${id}`);
    } catch {
      set({ tasks: previous });
    }
  },

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  clearFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
