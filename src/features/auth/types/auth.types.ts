import { ParentRole, UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  familyId: string | null;
  parentRole: ParentRole | null;
  isActive: boolean;
  isProfileComplete: boolean;
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
  parentRole: ParentRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}
