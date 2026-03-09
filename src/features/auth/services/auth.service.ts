import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken
} from '@react-native-firebase/auth';

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '../types/auth.types';

const auth = getAuth();

export const AuthService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { user } = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    const token = await getIdToken(user);
    return {
      user: {
        id: user.uid,
        email: user.email ?? '',
        fullName: user.displayName ?? '',
        phone: user.phoneNumber ?? '',
        role: 'dad',
        token,
      },
      token,
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    await user.updateProfile({ displayName: payload.fullName });
    const token = await getIdToken(user);
    return {
      user: {
        id: user.uid,
        email: user.email ?? '',
        fullName: payload.fullName,
        phone: payload.phone,
        role: payload.role,
        token,
      },
      token,
    };
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },
};
