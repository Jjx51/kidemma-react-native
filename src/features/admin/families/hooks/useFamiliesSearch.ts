import { useState, useEffect } from 'react';
import type { Family } from '@kdTypes';

export function useFamiliesSearch(families: Family[]) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Family[]>(families);

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(families);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        families.filter(
          f =>
            f.name.toLowerCase().includes(q) ||
            f.alias?.toLowerCase().includes(q),
        ),
      );
    }
  }, [search, families]);

  return { search, setSearch, filtered };
}
