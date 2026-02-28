export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Routine {
  id: string;
  title: string;
  time: string;
  weekdays: Weekday[];
  order: number;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoutinePayload {
  title: string;
  time: string;
  weekdays: Weekday[];
  order?: number;
}

export interface UpdateRoutinePayload extends Partial<CreateRoutinePayload> {
  isActive?: boolean;
}
