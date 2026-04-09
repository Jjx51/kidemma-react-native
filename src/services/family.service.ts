import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  Timestamp,
} from '@react-native-firebase/firestore';
import { QueryDocumentSnapshot } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestore';

import type { Family, FamilyFormData } from '@kdTypes';

const db = getFirestore();

export const FamilyService = {
  fetchAll: async (): Promise<Family[]> => {
    const snap = await getDocs(collection(db, 'FAMILIES'));
    return snap.docs.map((d: QueryDocumentSnapshot) => ({
      id: d.id,
      ...(d.data() as Omit<Family, 'id'>),
    }));
  },

  fetchById: async (familyId: string): Promise<Family | null> => {
    const snap = await getDoc(doc(db, 'FAMILIES', familyId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Family, 'id'>) };
  },

  create: async (data: FamilyFormData, createdBy: string): Promise<string> => {
    const ref = await addDoc(collection(db, 'FAMILIES'), {
      ...data,
      createdAt: Timestamp.now(),
      createdBy,
    });
    return ref.id;
  },

  update: async (
    familyId: string,
    data: Partial<FamilyFormData>,
  ): Promise<void> => {
    await updateDoc(doc(db, 'FAMILIES', familyId), data);
  },
};
