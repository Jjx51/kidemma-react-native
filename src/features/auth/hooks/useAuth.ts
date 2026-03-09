import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, getIdToken } from '@react-native-firebase/auth';

import { useAuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';
import type { LoginPayload, RegisterPayload } from '../types/auth.types';

export function useAuth() {
  const auth = getAuth();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        setAuth(
          {
            id: firebaseUser.uid,
            email: firebaseUser.email ?? '',
            fullName: firebaseUser.displayName ?? '',
            phone: firebaseUser.phoneNumber ?? '',
            role: 'dad',
            token,
          },
          token,
        );
      } else {
        clearAuth();
      }
      setIsInitializing(false);
    });

    return unsubscribe;
  }, []);

  const login = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await AuthService.login(payload);
      setAuth(user, token);
    } catch (e: any) {
      setError(mapFirebaseError(e.code));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await AuthService.register(payload);
      setAuth(user, token);
    } catch (e: any) {
      setError(mapFirebaseError(e.code));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AuthService.logout();
    clearAuth();
  };

  return {
    login,
    register,
    logout,
    user,
    isAuthenticated,
    isLoading,
    isInitializing,
    error,
  };
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos';
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet';
    default:
      return 'Ocurrió un error. Intenta de nuevo';
  }
}
