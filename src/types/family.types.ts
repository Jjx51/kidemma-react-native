import type { Child } from './child.types';
import type { FamilyMember } from './member.types';

export interface Family {
  id: string;
  name: string;
  alias: string;
  nationality: string;
  religion: string;
  createdAt: Date;
  createdBy: string;
  members: FamilyMember[];
  children: Child[];
}

export interface FamilyFormData {
  name: string;
  alias: string;
  nationality: string;
  religion: string;
}

export interface FamilyMember {
  id?: string;
  email: string;
  displayName: string;
  role: 'parent';
  isActive: boolean;
}

export type CreateFamilyPayload = Omit<
  Family,
  'id' | 'createdAt' | 'createdBy'
>;
