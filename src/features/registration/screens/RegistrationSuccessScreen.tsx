import { getFirestore, doc, updateDoc } from '@react-native-firebase/firestore';
import { getAuth, updateProfile } from '@react-native-firebase/auth';

import { RegistrationSuccessForm } from '../components/RegistrationSuccessForm';
import { useCompleteRegistration } from '../hooks/useCompleteRegistration';
import { useAuthStore } from '@auth/store/auth.store';

const db = getFirestore();
const auth = getAuth();

export function RegistrationSuccessScreen() {
  const { profileData, reset } = useCompleteRegistration();
  const { user, setAuth, token } = useAuthStore();

  const handleFinish = async () => {
    try {
      if (!user || !profileData) return;
      
      console.log('user.id:', user.id);
    console.log('profileData:', profileData);

    const docRef = doc(db, 'USERS', user.id);
    console.log('docRef path:', docRef.path);
      // Update Firestore
      await updateDoc(docRef, {
        fullName: profileData.fullName,
        phone: profileData.phone,
        phoneAdditional: profileData.phoneAdditional,
        role: profileData.role,
        isActive: true,
        isProfileComplete: true,
      });

      // Update Firebase Auth display name
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: profileData.fullName,
        });
      }

      // Update local store
      setAuth(
        {
          ...user,
          fullName: profileData.fullName,
          phone: profileData.phone,
          isActive: true,
          isProfileComplete: true,
        },
        token!,
      );

      reset();

      // AppNavigator reacts automatically to isProfileComplete: true
    } catch (e) {
      console.error('handleFinish error:', e);
    }
  };

  return <RegistrationSuccessForm onFinish={handleFinish} />;
}
