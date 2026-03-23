import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import {
  Input,
  Button,
  ScreenContainer,
  ScreenFooter,
  Avatar,
  ImageSelector,
  ImageSelectorOption,
  DateInput,
} from '@components';
import { type Child, Gender } from '@kdTypes';

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

interface CompleteChildFormProps {
  child: Child;
  onSubmit: (data: Partial<Child>) => void;
}

export function CompleteChildForm({ child, onSubmit }: CompleteChildFormProps) {
  const [fullName, setFullName] = useState(child.fullName);
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [gender, setGender] = useState<Gender>(child.gender);
  const [holidayException, setHolidayException] = useState('');
  const [allowPhotos, setAllowPhotos] = useState(false);
  const [allowSocialMedia, setAllowSocialMedia] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const isValid = fullName.trim().length > 0 && birthDate !== undefined;

  const handleSubmit = () => {
    console.log('birthDate:', birthDate, birthDate instanceof Date);
    onSubmit({
      fullName,
      birthDate,
      gender,
      holidayException,
      allowPhotos,
      allowSocialMedia,
      additionalNotes,
    });
  };

  return (
    <ScreenContainer disableTopInset>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <Avatar
            name={child.fullName}
            source={
              gender === Gender.Female
                ? require('@assets/images/girl.png')
                : require('@assets/images/boy.png')
            }
            size="xl"
          />
        </View>

        <Input
          label="Nombre completo"
          required
          value={fullName}
          onChangeText={setFullName}
          autoCorrect={false}
          leftIcon="person-outline"
        />

        <DateInput
          label="Fecha de nacimiento"
          required
          value={birthDate}
          onChange={setBirthDate}
          maximumDate={new Date()}
        />

        <Text style={styles.label}>
          Género <Text style={styles.required}>*</Text>
        </Text>
        <ImageSelector
          options={GENDERS}
          selected={gender}
          onChange={setGender}
          style={styles.genderSelector}
        />

        <Input
          label="Festividad que no celebro"
          value={holidayException}
          onChangeText={setHolidayException}
        />

        <Text style={styles.permissionLabel}>
          Autorizo tomar fotos a mi hijo que se compartirán únicamente conmigo.
        </Text>
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setAllowPhotos(false)}
          >
            <View style={[styles.radio, !allowPhotos && styles.radioActive]} />
            <Text style={styles.radioLabel}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setAllowPhotos(true)}
          >
            <View style={[styles.radio, allowPhotos && styles.radioActive]} />
            <Text style={styles.radioLabel}>Si</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.permissionLabel}>
          Autorizo el uso de fotos de mi hijo para subir a redes sociales.
        </Text>
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setAllowSocialMedia(false)}
          >
            <View
              style={[styles.radio, !allowSocialMedia && styles.radioActive]}
            />
            <Text style={styles.radioLabel}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setAllowSocialMedia(true)}
          >
            <View
              style={[styles.radio, allowSocialMedia && styles.radioActive]}
            />
            <Text style={styles.radioLabel}>Si</Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Comentarios adicionales"
          value={additionalNotes}
          onChangeText={setAdditionalNotes}
          multiline
          numberOfLines={4}
          inputStyle={styles.multilineInput}
        />
      </ScrollView>

      <ScreenFooter>
        <Button label="Continuar" onPress={handleSubmit} disabled={!isValid} />
      </ScreenFooter>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.primary,
  },
  dateButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  dateText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  genderSelector: {
    justifyContent: 'flex-start',
    marginBottom: SPACING.md,
  },
  permissionLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  radioRow: {
    flexDirection: 'row',
    gap: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  radioActive: {
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: SPACING.sm,
  },
});
