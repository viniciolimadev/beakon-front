export interface User {
  id: string;
  name: string;
  email: string;
  xp?: number;
  streakDays?: number;
  createdAt?: string;
  updatedAt?: string;
}
