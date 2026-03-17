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
import type { FamilyFormData } from '@types';

interface Props {
  form: FamilyFormData;
  onChange: (field: keyof FamilyFormData, value: string) => void;
  onContinue: () => void;
}

export function NewFamilyForm({ form, onChange, onContinue }: Props) {
  const insets = useSafeAreaInsets();
  const isValid = form.name.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.subtitle}>
            Empieza creando una familia para gestionar las actividades.
          </Text>

          <Text style={styles.label}>Nombre Familia*</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={v => onChange('name', v)}
          />

          <Text style={styles.label}>Alias</Text>
          <TextInput
            style={styles.input}
            value={form.alias}
            onChangeText={v => onChange('alias', v)}
          />

          <Text style={styles.label}>Nacionalidad</Text>
          <TextInput
            style={styles.input}
            value={form.nationality}
            onChangeText={v => onChange('nationality', v)}
          />

          <Text style={styles.label}>Religión</Text>
          <TextInput
            style={styles.input}
            value={form.religion}
            onChangeText={v => onChange('religion', v)}
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
    paddingTop: SPACING.md
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  headerTitle: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
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
    color: COLORS.textMuted,
  },
});
