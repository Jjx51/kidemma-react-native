import { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';
import type { LoginPayload, RegisterPayload } from '../types/auth.types';

export function useAuth() {
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await AuthService.login(payload);
      setAuth(user, token);
    } catch (e: any) {
      setError(e.message ?? 'Error al iniciar sesión');
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
      setError(e.message ?? 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => clearAuth();

  return { login, register, logout, user, isAuthenticated, isLoading, error };
}
