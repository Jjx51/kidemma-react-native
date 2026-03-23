import { View, StyleSheet, Image } from 'react-native';

import { COLORS, SPACING } from '@theme';
import { Button, ScreenContainer, ScreenHeader } from '@components';

interface RegistrationSuccessFormProps {
  onFinish: () => void;
}

export function RegistrationSuccessForm({
  onFinish,
}: RegistrationSuccessFormProps) {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@assets/images/ic_register_completed.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <ScreenHeader
          title="Registro completado"
          subtitle="Has finalizado con el registro, ahora puedes hacer uso de la
          aplicación."
        />

        <Button
          onPress={onFinish}
          label="Finalizar"
          style={styles.finishButton}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.lg,
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  illustration: {
    width: 160,
    height: 160,
  },
  finishButton: {
    alignSelf: 'stretch',
  },
});
