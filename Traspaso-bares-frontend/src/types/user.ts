export type UserRole = 'admin' | 'staff';
export type UserOperationalArea = 'bar' | 'kitchen';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  operationalArea:UserOperationalArea
}