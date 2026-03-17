export interface Child {
  id?: string;
  name: string;
  gender: 'male' | 'female';
  familyId: string;
  guardianIds: string[];
}
