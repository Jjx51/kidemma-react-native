import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AuthScreenProps } from '@navigation/types';
import { COLORS } from '@theme';
import type { UserRole } from '../types/auth.types';
import { useAuth } from '../hooks/useAuth';
import { RoleSelector } from '../components/RoleSelector';

type Props = AuthScreenProps<'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register, isLoading, error } = useAuth();

  const [role, setRole] = useState<UserRole>('mom');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneAdditional, setPhoneAdditional] = useState('');

  // Multi-step: step 1 = role + personal info, step 2 = email + password
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isStep1Valid = fullName.trim() && phone.trim();
  const isStep2Valid = email.trim() && password.trim();

  const handleContinue = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    }
  };

  const handleRegister = () => {
    if (!isStep2Valid) return;
    register({ email, password, fullName, phone, phoneAdditional, role });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.title}>Registro</Text>
          <Text style={styles.subtitle}>
            Ahora eres parte de la comunidad. Por favor llena los datos para continuar.
          </Text>

          {step === 1 ? (
            <>
              {/* Role selector */}
              <Text style={styles.sectionLabel}>¿Quien soy?</Text>
              <RoleSelector selected={role} onChange={setRole} />

              {/* Full name */}
              <Text style={styles.label}>Nombre completo*</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Phone */}
              <Text style={styles.label}>Teléfono*</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                />
              </View>

              {/* Additional phone */}
              <Text style={styles.label}>Teléfono adicional</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={phoneAdditional}
                  onChangeText={setPhoneAdditional}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                />
              </View>

              {/* Continue */}
              <TouchableOpacity
                style={[styles.button, !isStep1Valid && styles.buttonDisabled]}
                onPress={handleContinue}
                disabled={!isStep1Valid}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Back button */}
              <TouchableOpacity
                onPress={() => setStep(1)}
                style={styles.backButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.backButtonText}>← Regresar</Text>
              </TouchableOpacity>

              {/* Email */}
              <Text style={styles.label}>Correo electrónico*</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>

              {/* Password */}
              <Text style={styles.label}>Contraseña*</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.eyeToggle}>
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Error */}
              {error && <Text style={styles.errorText}>{error}</Text>}

              {/* Register button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isStep2Valid || isLoading) && styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={!isStep2Valid || isLoading}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.buttonText}>Crear cuenta</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          {/* Step indicator */}
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, step === 1 && styles.stepDotActive]} />
            <View style={[styles.stepDot, step === 2 && styles.stepDotActive]} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 6,
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    height: '100%',
  },
  eyeToggle: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  stepDotActive: {
    backgroundColor: COLORS.primary,
  },
});
