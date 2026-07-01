export type UserRole = 'admin' | 'staff';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}