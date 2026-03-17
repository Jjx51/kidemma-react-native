import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { ParentRole } from '@features/auth/enums';
import { RoleSelector } from './RoleSelector';

export interface CompleteRegistrationFormData {
  parentRole: ParentRole;
  fullName: string;
  phone: string;
  phoneAdditional: string;
}

interface Props {
  form: CompleteRegistrationFormData;
  onChange: (field: keyof CompleteRegistrationFormData, value: string) => void;
  onContinue: () => void;
}

export function CompleteRegistrationForm({
  form,
  onChange,
  onContinue,
}: Props) {
  const insets = useSafeAreaInsets();
  const isValid =
    form.fullName.trim().length > 0 && form.phone.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Registro</Text>
          <Text style={styles.subtitle}>
            Ahora eres parte de la comunidad. Por favor llena los datos para
            continuar.
          </Text>

          <RoleSelector selected={form.parentRole} onChange={(e) => onChange('parentRole', e)}/>

          {/* Nombre completo */}
          <Text style={styles.label}>Nombre completo*</Text>
          <TextInput
            style={styles.input}
            value={form.fullName}
            onChangeText={v => onChange('fullName', v)}
            autoCorrect={false}
          />

          {/* Teléfono */}
          <Text style={styles.label}>Teléfono*</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={v => onChange('phone', v)}
            keyboardType="phone-pad"
          />

          {/* Teléfono adicional */}
          <Text style={styles.label}>Teléfono adicional</Text>
          <TextInput
            style={styles.input}
            value={form.phoneAdditional}
            onChangeText={v => onChange('phoneAdditional', v)}
            keyboardType="phone-pad"
          />
        </ScrollView>

        {/* Footer */}
        <View
          style={[styles.footer, { paddingBottom: insets.bottom + SPACING.md }]}
        >
          <TouchableOpacity
            style={[styles.continueButton, !isValid && styles.disabled]}
            onPress={() => isValid && onContinue()}
            activeOpacity={isValid ? 0.8 : 1}
          >
            <Text
              style={[
                styles.continueButtonText,
                !isValid && styles.disabledText,
              ]}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
    fontSize: 28,
    textAlign: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  roleRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  roleOption: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  roleAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleAvatarSelected: {
    borderColor: COLORS.primary,
  },
  roleAvatarImage: {
    width: 52,
    height: 52,
  },
  roleLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  roleLabelSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.disabledButton,
  },
  continueButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
  disabledText: {
    color: COLORS.textSecondary,
  },
});
