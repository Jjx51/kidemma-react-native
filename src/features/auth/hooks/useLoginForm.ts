import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';

import { mapFirebaseError } from '@utils/firebaseErrors';
import { useAuth } from './useAuth';

const auth = getAuth();

export function useLoginForm() {
  const { login, isLoading, error: authError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const error = localError ?? authError;

  const isValid = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (!isValid) {
      return;
    }
    login({ email, password });
  };

  const handleResendInvite = async () => {
    if (!email.trim()) {
      setLocalError('Ingresa tu correo para reenviar la invitación');
      return;
    }
    try {
      setIsResendLoading(true);
      setLocalError(null);
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setResendSuccess(true);
    } catch (e: any) {
      setLocalError(mapFirebaseError(e.code));
    } finally {
      setIsResendLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return {
    email,
    password,
    showPassword,
    setEmail,
    setPassword,
    toggleShowPassword,
    isValid,
    isLoading,
    error,
    handleLogin,
    isResendLoading,
    resendSuccess,
    handleResendInvite,
  };
}
