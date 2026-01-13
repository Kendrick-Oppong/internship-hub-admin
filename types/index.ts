export type UserRole = "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
