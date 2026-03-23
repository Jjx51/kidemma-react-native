import { create } from 'zustand';
import type { CompleteRegistrationFormData } from '@registration/components/CompleteRegistrationForm';
import type { Child } from '@kdTypes';

interface CompleteRegistrationState {
  profileData: CompleteRegistrationFormData | null;
  completedChildren: Record<string, Partial<Child>>;

  setProfileData: (data: CompleteRegistrationFormData) => void;
  setChildData: (childId: string, data: Partial<Child>) => void;
  getChildDraft: (childId: string) => Partial<Child> | undefined;
  isChildComplete: (childId: string) => boolean;
  areAllComplete: (childIds: string[]) => boolean;
  reset: () => void;
}

export const useRegistrationStore = create<CompleteRegistrationState>(
  (set, get) => ({
    profileData: null,
    completedChildren: {},

    setProfileData: data => set({ profileData: data }),

    setChildData: (childId, data) =>
      set(state => ({
        completedChildren: {
          ...state.completedChildren,
          [childId]: data,
        },
      })),

    getChildDraft: childId => get().completedChildren[childId],

    isChildComplete: childId => {
      const completed = get().completedChildren;
      console.log('isChildComplete called:', childId, completed);
      const child = completed[childId];
      return !!(
        child?.fullName?.trim() &&
        child?.birthDate instanceof Date &&
        child?.gender !== undefined
      );
    },

    areAllComplete: childIds => childIds.every(id => get().isChildComplete(id)),

    reset: () => set({ profileData: null, completedChildren: {} }),
  }),
);
