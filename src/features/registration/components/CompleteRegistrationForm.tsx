import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { ParentRole } from '@kdTypes';
import { RoleSelector } from './RoleSelector';
import {
  Button,
  Input,
  ScreenContainer,
  ScreenFooter,
  ScreenHeader,
} from '@components';

export interface CompleteRegistrationFormData {
  parentRole: ParentRole;
  fullName: string;
  phone: string;
  phoneAdditional: string;
}

interface CompleteRegistrationFormProps {
  form: CompleteRegistrationFormData;
  onChange: (field: keyof CompleteRegistrationFormData, value: string) => void;
  onContinue: () => void;
}

export function CompleteRegistrationForm({
  form,
  onChange,
  onContinue,
}: CompleteRegistrationFormProps) {
  const insets = useSafeAreaInsets();
  const isValid =
    form.fullName.trim().length > 0 && form.phone.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            title="Registro"
            subtitle="Ahora eres parte de la comunidad. Por favor llena los datos para
            continuar."
          />

          <Text style={styles.sectionTitle}>¿Quien soy?</Text>

          <RoleSelector
            selected={form.parentRole}
            onChange={e => onChange('parentRole', e)}
          />

          <Input
            label="Nombre completo"
            required
            value={form.fullName}
            onChangeText={v => onChange('fullName', v)}
            autoCorrect={false}
            leftIcon="person-outline"
            variant="minimal"
            containerStyle={{ marginTop: SPACING.lg }}
          />

          <Input
            label="Teléfono"
            required
            value={form.phone}
            onChangeText={v => onChange('phone', v)}
            keyboardType="phone-pad"
            leftIcon="call-outline"
            variant="minimal"
          />

          <Input
            label="Teléfono adicional"
            value={form.phoneAdditional}
            onChangeText={v => onChange('phoneAdditional', v)}
            keyboardType="phone-pad"
            leftIcon="call-outline"
            variant="minimal"
          />
        </ScrollView>

        <ScreenFooter>
          <Button label="Continuar" onPress={onContinue} disabled={!isValid} />
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
  sectionTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'left',
    marginBottom: SPACING.sm,
  },
});
