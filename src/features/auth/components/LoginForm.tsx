import { View, Text, StyleSheet } from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { useLoginForm } from '../hooks/useLoginForm';
import { Button, Input } from '@components';

export function LoginForm() {
  const {
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
  } = useLoginForm();

  return (
    <View style={styles.container}>
      <Input
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon="mail"
        disabled={isLoading}
        variant="minimal"
      />

      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon="lock-closed"
        rightIcon={showPassword ? 'eye-off' : 'eye'}
        onRightIconPress={toggleShowPassword}
        disabled={isLoading}
        variant="minimal"
      />

      <Text style={styles.errorText}>{error}</Text>

      <Button
        label="Iniciar sesión"
        onPress={handleLogin}
        loading={isLoading}
        disabled={!isValid}
        style={{ marginVertical: SPACING.md }}
      />
      <Button
        variant="text"
        label={
          isResendLoading
            ? 'Enviando...'
            : resendSuccess
            ? '¡Listo! Si tu correo está registrado, recibirás un enlace en tu bandeja de entrada'
            : '¿Primera vez? Revisa tu correo o reenvía la invitación'
        }
        onPress={handleResendInvite}
        disabled={resendSuccess || isResendLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
