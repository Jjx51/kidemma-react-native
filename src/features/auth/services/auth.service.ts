import { delay } from '@utils/async.utils';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '../types/auth.types';

export const AuthService = {
  // ─── Mock Login ───────────────────────────────────────────────────────────────
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    await delay(2000);

    if (payload.email === 'test@kidemma.com' && payload.password === '123456') {
      return {
        user: {
          id: '1',
          email: payload.email,
          fullName: 'Luis Martinez',
          phone: '614-000-0000',
          role: 'dad',
          token: 'mock-jwt-token',
        },
        token: 'mock-jwt-token',
      };
    }

    throw new Error('Correo o contraseña incorrectos');
  },

  // ─── Mock Register ────────────────────────────────────────────────────────────
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await delay(1200);

    return {
      user: {
        id: '2',
        email: payload.email,
        fullName: payload.fullName,
        phone: payload.phone,
        role: payload.role,
        token: 'mock-jwt-token-new',
      },
      token: 'mock-jwt-token-new',
    };
  },
};
