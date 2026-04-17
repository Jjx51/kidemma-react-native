import {
  getFirestore,
  doc,
  writeBatch,
  Timestamp,
} from '@react-native-firebase/firestore';
import { getAuth, updateProfile } from '@react-native-firebase/auth';
import type { Child } from '@kdTypes';
import type { CompleteRegistrationFormData } from '../components/CompleteRegistrationForm';

const db = getFirestore();
const auth = getAuth();

export const RegistrationService = {
  completeRegistration: async (
    userId: string,
    profileData: CompleteRegistrationFormData,
    completedChildren: Record<string, Partial<Child>>,
  ) => {
    const batch = writeBatch(db);

    // Update user profile
    batch.update(doc(db, 'USERS', userId), {
      fullName: profileData.fullName,
      phone: profileData.phone,
      phoneAdditional: profileData.phoneAdditional,
      role: profileData.parentRole,
      isActive: true,
      isProfileComplete: true,
    });

    // Update each child
    Object.entries(completedChildren).forEach(([childId, childData]) => {
      batch.update(doc(db, 'CHILDREN', childId), {
        ...childData,
        birthDate: childData.birthDate
          ? Timestamp.fromDate(childData.birthDate)
          : null,
        isComplete: true,
      });
    });

    await batch.commit();

    // Update Firebase Auth display name
    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: profileData.fullName,
      });
    }
  },
};
