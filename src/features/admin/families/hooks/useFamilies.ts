import { useState, useEffect } from 'react';

import { FamilyService } from '@services/family.service';
import type { Family } from '@kdTypes';

export function useFamilies() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFamilies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFamilies = async () => {
    try {
      const data = await FamilyService.fetchAll();
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
