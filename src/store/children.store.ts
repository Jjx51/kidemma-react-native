import { create } from 'zustand';

import { ChildrenService } from '@services/children.service';
import type { Child } from '@kdTypes';

interface ChildrenState {
  children: Child[];
  child: Child | null;
  loading: boolean;
  error: string | null;

  fetchChildren: (familyId: string) => Promise<void>;
  fetchChild: (childId: string) => Promise<void>;
  reset: () => void;
}

export const useChildrenStore = create<ChildrenState>(set => ({
  children: [],
  child: null,
  loading: false,
  error: null,

  fetchChildren: async (familyId: string) => {
    try {
      set({ loading: true, error: null });
      const data = await ChildrenService.fetchByFamilyId(familyId);
      set({ children: data });
    } catch (e) {
      set({ error: 'Error al cargar los hijos' });
    } finally {
      set({ loading: false });
    }
  },

  fetchChild: async (childId: string) => {
    try {
      set({ loading: true, error: null });
      const data = await ChildrenService.fetchById(childId);
      set({ child: data });
    } catch (e) {
      set({ error: 'Error al cargar el hijo' });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ children: [], child: null, error: null }),
}));
