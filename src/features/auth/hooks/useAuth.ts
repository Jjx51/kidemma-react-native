import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  getIdToken,
} from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';

import { mapFirebaseError } from '@utils/firebaseErrors';
import { useAuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';
import type { LoginPayload, User } from '../types/auth.types';

const auth = getAuth();

export function useAuth() {
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      try {
        if (firebaseUser) {
          const token = await getIdToken(firebaseUser);
          const docRef = doc(db, 'USERS', firebaseUser.uid);
          const snap = await getDoc(docRef);
          const profile = snap.data() as User | undefined;

          setAuth(
            {
              id: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              fullName: profile?.fullName ?? '',
              phone: profile?.phone ?? '',
              role: profile?.role ?? 'parent',
              familyId: profile?.familyId ?? null,
              isActive: profile?.isActive ?? false,
              isProfileComplete: profile?.isProfileComplete ?? false,
              token,
            },
            token,
          );
        } else {
          clearAuth();
        }
      } catch (e) {
        console.error('useAuth error:', e);
        clearAuth();
      } finally {
        setIsInitializing(false); // always runs regardless of error
      }
    });

    return unsubscribe;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.login(payload);
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
    logout,
    user,
    isAuthenticated,
    isLoading,
    isInitializing,
    error,
  };
}
