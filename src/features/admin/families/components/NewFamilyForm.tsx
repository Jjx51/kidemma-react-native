import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import type { FamilyFormData } from '@kdTypes';
import { Button, Input, ScreenFooter } from '@components';

interface NewFamilyFormProps {
  form: FamilyFormData;
  onChange: (field: keyof FamilyFormData, value: string) => void;
  onContinue: () => void;
}

export function NewFamilyForm({
  form,
  onChange,
  onContinue,
}: NewFamilyFormProps) {
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

          <Input
            label="Nombre Familia"
            required
            value={form.name}
            onChangeText={v => onChange('name', v)}
            variant="minimal"
          />

          <Input
            label="Alias"
            value={form.alias}
            onChangeText={v => onChange('alias', v)}
            variant="minimal"
          />

          <Input
            label="Nacionalidad"
            value={form.nationality}
            onChangeText={v => onChange('nationality', v)}
            variant="minimal"
          />

          <Input
            label="Religión"
            value={form.religion}
            onChangeText={v => onChange('religion', v)}
            variant="minimal"
          />
        </ScrollView>

        <ScreenFooter>
          <Button label="Continuar" onPress={onContinue} disabled={!isValid} />
        </ScreenFooter>
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
