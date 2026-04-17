import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { Button, Input, ScreenContainer, ScreenFooter } from '@components';

export interface MemberFormData {
  email: string;
  displayName: string;
}

interface AddMemberFormProps {
  form: MemberFormData;
  onChange: (field: keyof MemberFormData, value: string) => void;
  onContinue: () => void;
}

export function AddMemberForm({
  form,
  onChange,
  onContinue,
}: AddMemberFormProps) {
  const isValid =
    form.email.trim().length > 0 && form.displayName.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer disableTopInset>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            El nombre temporal será reemplazado una vez que el usuario se
            registre.
          </Text>

          <Input
            label="Correo electrónico"
            required
            value={form.email}
            onChangeText={v => onChange('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon="mail-outline"
            variant="minimal"
          />

          <Input
            label="Nombre temporal"
            required
            value={form.displayName}
            onChangeText={v => onChange('displayName', v)}
            leftIcon="person-outline"
            variant="minimal"
          />
        </ScrollView>

        <ScreenFooter>
          <Button
            label="Agregar miembro"
            onPress={onContinue}
            disabled={!isValid}
          />
        </ScreenFooter>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
});
