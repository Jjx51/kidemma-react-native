import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from '@react-native-firebase/firestore';
import { QueryDocumentSnapshot } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestore';

import type { Child } from '@kdTypes';

const db = getFirestore();

export const ChildrenService = {
  fetchByFamilyId: async (familyId: string): Promise<Child[]> => {
    const q = query(
      collection(db, 'CHILDREN'),
      where('familyId', '==', familyId),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d: QueryDocumentSnapshot) => ({
      id: d.id,
      ...(d.data() as Omit<Child, 'id'>),
    }));
  },

  fetchById: async (childId: string): Promise<Child | null> => {
    const snap = await getDoc(doc(db, 'CHILDREN', childId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Child, 'id'>) };
  },

  update: async (childId: string, data: Partial<Child>): Promise<void> => {
    await updateDoc(doc(db, 'CHILDREN', childId), {
      ...data,
      birthDate: data.birthDate
        ? Timestamp.fromDate(data.birthDate)
        : undefined,
    });
  },

  completeChildProfile: async (
    childId: string,
    data: Partial<Child>,
  ): Promise<void> => {
    await updateDoc(doc(db, 'CHILDREN', childId), {
      ...data,
      birthDate: data.birthDate
        ? Timestamp.fromDate(data.birthDate)
        : undefined,
      isComplete: true,
    });
  },
};
