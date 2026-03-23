import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { type BaseChild, Gender } from '@kdTypes';
import {
  Button,
  ImageSelector,
  ImageSelectorOption,
  Input,
  ScreenContainer,
  ScreenFooter,
  ScreenHeader,
} from '@components';

const GENDERS: ImageSelectorOption<Gender>[] = [
  {
    value: Gender.Male,
    label: 'Niño',
    source: require('@assets/images/boy.png'),
  },
  {
    value: Gender.Female,
    label: 'Niña',
    source: require('@assets/images/girl.png'),
  },
];

interface AddChildFormProps {
  form: BaseChild;
  onChange: (field: keyof BaseChild, value: string) => void;
  onSubmit: () => void;
}

export function AddChildForm({ form, onChange, onSubmit }: AddChildFormProps) {
  const isValid = form.fullName?.trim().length && form.gender !== undefined;

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
          <ScreenHeader
            subtitle="La información complementaria será llenada posteriormente por los miembros de familia."
            subtitleStyles={styles.subtitle}
            style={styles.header}
          />
          <Input
            label="Nombre"
            required
            value={form.fullName}
            onChangeText={v => onChange('fullName', v)}
            autoCorrect={false}
            leftIcon="person-outline"
          />
          <Text style={styles.label}>Genero *</Text>
          <ImageSelector
            options={GENDERS}
            selected={form.gender ?? Gender.Male}
            onChange={v => onChange('gender', v)}
            size='xl'
          />
        </ScrollView>
        <ScreenFooter>
          <Button label="Agregar hijo" onPress={onSubmit} disabled={!isValid} />
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
  header: {
    paddingHorizontal: 0,
  },
  subtitle: {
    textAlign: 'left',
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
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
});
