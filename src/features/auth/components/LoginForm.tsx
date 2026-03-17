import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '@theme';
import { useLoginForm } from '../hooks/useLoginForm';

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
      <Text style={styles.label}>Correo electrónico</Text>
      <View
        style={[styles.inputWrapper, isLoading && styles.inputWrapperDisabled]}
      >
        <Ionicons
          name="mail"
          size={20}
          color={COLORS.iconColor}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, isLoading && styles.inputDisabled]}
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={COLORS.placeholderForms}
        />
      </View>

      <Text style={styles.label}>Contraseña</Text>
      <View
        style={[styles.inputWrapper, isLoading && styles.inputWrapperDisabled]}
      >
        <Ionicons
          name="lock-closed"
          size={20}
          color={COLORS.iconColor}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, isLoading && styles.inputDisabled]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          editable={!isLoading}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={COLORS.placeholderForms}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[
          styles.button,
          (!isValid || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!isValid || isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ghostButton}
        onPress={handleResendInvite}
        disabled={resendSuccess || isResendLoading}
        activeOpacity={resendSuccess || isResendLoading ? 1 : 0.6}
      >
        <Text
          style={[
            styles.ghostButtonText,
            (resendSuccess || isResendLoading) &&
              styles.ghostButtonTextDisabled,
          ]}
        >
          {isResendLoading
            ? 'Enviando...'
            : resendSuccess
            ? '¡Listo! Si tu correo está registrado, recibirás un enlace en tu bandeja de entrada'
            : '¿Primera vez? Revisa tu correo o reenvía la invitación'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    ...TYPOGRAPHY.label,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.inputHeight,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: LAYOUT.borderRadius,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
  },
  inputWrapperDisabled: {
    backgroundColor: COLORS.disabledButton,
    borderColor: COLORS.divisor,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    height: '100%',
  },
  inputDisabled: {
    color: COLORS.disabledButtonText,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  button: {
    height: LAYOUT.buttonHeight,
    backgroundColor: COLORS.primaryButton,
    borderRadius: LAYOUT.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...TYPOGRAPHY.buttonPrimary,
  },
  ghostButton: {
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  ghostButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.title,
    textDecorationLine: 'underline',
  },
  ghostButtonTextDisabled: {
    color: COLORS.textMuted,
    textDecorationLine: 'none',
  },
});
