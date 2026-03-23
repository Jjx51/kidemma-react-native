import { useAuthStore } from '@auth/store/auth.store';
import { RegistrationSuccessForm } from '../components';
import { useRegistrationStore } from '../store';
import { RegistrationService } from '../services';

export function RegistrationSuccessScreen() {
  const { user, setAuth, token } = useAuthStore();
  const { profileData, completedChildren, reset } = useRegistrationStore();

  const handleFinish = async () => {
    try {
      if (!user || !profileData) return;

      await RegistrationService.completeRegistration(
        user.id,
        profileData,
        completedChildren,
      );

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
    } catch (e) {
      console.error('handleFinish error:', e);
    }
  };

  return <RegistrationSuccessForm onFinish={handleFinish} />;
}
