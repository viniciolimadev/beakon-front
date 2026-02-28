export enum TaskStatus {
  Inbox = "inbox",
  Today = "today",
  ThisWeek = "this_week",
  Backlog = "backlog",
  Done = "done",
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedMinutes?: number;
  dueDate?: string;
  order: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  estimatedMinutes?: number;
  dueDate?: string;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {}
