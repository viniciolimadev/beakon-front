import { create } from "zustand";
import { Task, TaskStatus, CreateTaskPayload, UpdateTaskPayload } from "@/types/task";

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

  fetchTasks: async () => {
    set({ isLoading: true });
    // TODO: implementar em US-F20
    set({ isLoading: false });
  },

  createTask: async () => {
    // TODO: implementar em US-F22 / US-F23
  },

  updateTask: async (id, data) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
    }));
    // TODO: implementar chamada API em US-F23
  },

  moveTask: async (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
    // TODO: implementar chamada API em US-F24
  },

  reorderTask: async (id, order) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, order } : t)),
    }));
    // TODO: implementar chamada API em US-F25
  },

  completeTask: async (id) => {
    await get().moveTask(id, TaskStatus.Done);
  },

  deleteTask: async (id) => {
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    // TODO: implementar chamada API em US-F23
  },

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  clearFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
