import Config from 'react-native-config';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

const FIREBASE_API_KEY = Config.FIREBASE_API_KEY;

export const AuthAdminService = {
  createUser: async (email: string, password: string): Promise<string> => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: false,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message ?? 'Error creating user');
    }

    return data.localId; // this is the uid
  },
  getUserByEmail: async (email: string): Promise<FirebaseAuthTypes.User> => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.users?.length) {
      throw new Error(data.error?.message ?? 'User not found');
    }

    return data.users[0];
  },
};
