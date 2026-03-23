import { useState, useEffect } from 'react';
import { getDocs, collection } from '@react-native-firebase/firestore';
import { getFirestore } from '@react-native-firebase/firestore';
import { QueryDocumentSnapshot } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestore';

import type { Family } from '@kdTypes';

const db = getFirestore();

export function useFamilies() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFamilies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFamilies = async () => {
    try {
      const snap = await getDocs(collection(db, 'FAMILIES'));
      const data = snap.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...(doc.data() as Omit<Family, 'id'>),
      }));
      setFamilies(data);
    } catch (e) {
      console.error('fetchFamilies error:', e);
      setError('Error al cargar las familias');
    } finally {
      setLoading(false);
    }
  };

  return { families, loading, error, refetch: fetchFamilies };
}
