import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import type { LoginPayload, RegisterPayload } from '../types/auth.types';

const auth = getAuth();

export const AuthService = {
  login: async (payload: LoginPayload): Promise<void> => {
    await signInWithEmailAndPassword(auth, payload.email, payload.password);
  },

  register: async (payload: RegisterPayload): Promise<void> => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    await user.updateProfile({ displayName: payload.fullName });
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },
};
