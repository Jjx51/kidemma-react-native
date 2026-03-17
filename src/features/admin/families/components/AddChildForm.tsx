import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import type { Child } from '@types';

interface Props {
  form: Partial<Child>;
  onChange: (field: keyof Partial<Child>, value: string) => void;
  onSubmit: () => void;
}

export function AddChildForm({ form, onChange, onSubmit }: Props) {
  const insets = useSafeAreaInsets();
  const isValid = form.name?.trim().length && form.gender !== undefined;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            La información complementaria será llenada posteriormente por los
            miembros de familia.
          </Text>

          {/* Nombre */}
          <Text style={styles.label}>Nombre*</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={v => onChange('name', v)}
            autoCorrect={false}
          />

          {/* Género */}
          <Text style={styles.label}>Genero*</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                form.gender === 'male' && styles.genderSelected,
              ]}
              onPress={() => onChange('gender', 'male')}
              activeOpacity={0.8}
            >
              <Image
                source={require('@assets/images/boy.png')}
                style={styles.genderAvatar}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                form.gender === 'female' && styles.genderSelected,
              ]}
              onPress={() => onChange('gender', 'female')}
              activeOpacity={0.8}
            >
              <Image
                source={require('@assets/images/girl.png')}
                style={styles.genderAvatar}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer */}
        <View
          style={[styles.footer, { paddingBottom: insets.bottom + SPACING.md }]}
        >
          <TouchableOpacity
            style={[styles.submitButton, !isValid && styles.disabled]}
            onPress={() => isValid && onSubmit()}
            activeOpacity={isValid ? 0.8 : 1}
          >
            <Text
              style={[styles.submitButtonText, !isValid && styles.disabledText]}
            >
              Agregar hijo
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
    paddingTop: SPACING.md,
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
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  genderOption: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderSelected: {
    borderColor: COLORS.primary,
  },
  genderAvatar: {
    width: 68,
    height: 68,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.disabledButton,
  },
  submitButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
});
