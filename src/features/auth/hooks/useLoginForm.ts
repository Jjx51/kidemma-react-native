import { useState } from 'react';
import { useAuth } from './useAuth';

export function useLoginForm() {
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (!isValid) return;
    login({ email, password });
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
  };
}
