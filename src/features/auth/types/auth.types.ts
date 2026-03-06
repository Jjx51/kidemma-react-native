export type UserRole = 'mom' | 'dad' | 'other';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  phoneAdditional?: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}
