import { create } from 'zustand';
import type { CompleteRegistrationFormData } from '../components/CompleteRegistrationForm';

interface CompleteRegistrationState {
  profileData: CompleteRegistrationFormData | null;
  setProfileData: (data: CompleteRegistrationFormData) => void;
  reset: () => void;
}

export const useCompleteRegistration = create<CompleteRegistrationState>(
  set => ({
    profileData: null,
    setProfileData: data => set({ profileData: data }),
    reset: () => set({ profileData: null }),
  }),
);
