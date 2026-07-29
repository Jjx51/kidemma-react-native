export type GenderFilter =
  | 'ALL'
  | 'BOY'
  | 'GIRL';

export type AgeRangeFilter =
  | 'ALL'
  | '4_TO_12_MONTHS'
  | '1_TO_2_YEARS'
  | '2_TO_3_YEARS'
  | '3_TO_4_YEARS';

export interface FilterOption<T> {
  label: string;
  value: T;
}

export const GENDER_OPTIONS: FilterOption<GenderFilter>[] = [
  {
    label: 'Todos',
    value: 'ALL',
  },
  {
    label: 'Niño',
    value: 'BOY',
  },
  {
    label: 'Niña',
    value: 'GIRL',
  },
];

export const AGE_RANGE_OPTIONS: FilterOption<AgeRangeFilter>[] = [
  {
    label: 'Todas',
    value: 'ALL',
  },
  {
    label: '4 a 12 meses',
    value: '4_TO_12_MONTHS',
  },
  {
    label: '1 a 2 años',
    value: '1_TO_2_YEARS',
  },
  {
    label: '2 a 3 años',
    value: '2_TO_3_YEARS',
  },
  {
    label: '3 a 4 años',
    value: '3_TO_4_YEARS',
  },
];