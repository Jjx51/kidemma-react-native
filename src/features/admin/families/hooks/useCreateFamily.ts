import { create } from 'zustand';
import type { FamilyFormData, FamilyMember, Child } from '@types';

interface CreateFamilyState {
  familyData: FamilyFormData;
  members: FamilyMember[];
  children: Child[];

  setFamilyData: (data: FamilyFormData) => void;
  addMember: (member: FamilyMember) => void;
  removeMember: (email: string) => void;
  addChild: (child: Child) => void;
  removeChild: (name: string) => void;
  reset: () => void;
}

const initialFamilyData: FamilyFormData = {
  name: '',
  alias: '',
  nationality: '',
  religion: '',
};

export const useCreateFamily = create<CreateFamilyState>(set => ({
  familyData: initialFamilyData,
  members: [],
  children: [],

  setFamilyData: data => set({ familyData: data }),

  addMember: member => set(state => ({ members: [...state.members, member] })),

  removeMember: email =>
    set(state => ({
      members: state.members.filter(m => m.email !== email),
    })),

  addChild: child => set(state => ({ children: [...state.children, child] })),

  removeChild: name =>
    set(state => ({
      children: state.children.filter(k => k.name !== name),
    })),

  reset: () =>
    set({ familyData: initialFamilyData, members: [], children: [] }),
}));
