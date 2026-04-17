import { useMemo } from 'react';

import { useChildrenStore } from '@store';
import type { Child } from '@kdTypes';
import { useRegistrationStore } from '../registration.store';

export function useChildWithDraft(childId: string): Child | null {
  const { child } = useChildrenStore();
  const draft = useRegistrationStore(s => s.completedChildren[childId]);

  return useMemo(() => {
    if (!child) return null;
    return {
      ...child,
      ...draft,
    } as Child;
  }, [child, draft]);
}

export function useChildrenWithDraft() {
  const children = useChildrenStore(s => s.children);
  const completedChildren = useRegistrationStore(s => s.completedChildren);

  return useMemo(
    () =>
      children.map(child => ({
        ...child,
        ...completedChildren[child.id!],
      })),
    [children, completedChildren],
  );
}
