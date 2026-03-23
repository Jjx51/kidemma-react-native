import { Gender } from './enums';

export interface BaseChild {
  id?: string;
  fullName: string;
  gender: Gender;
}
export interface Child extends BaseChild {
  familyId: string;
  guardianIds: string[];
  birthDate?: Date;
  holidayException?: string;
  allowPhotos?: boolean;
  allowSocialMedia?: boolean;
  additionalNotes?: string;
  isComplete?: boolean;
}
