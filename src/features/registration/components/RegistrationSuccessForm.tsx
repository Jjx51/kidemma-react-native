import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING } from '@theme';

interface Props {
  onFinish: () => void;
}

export function RegistrationSuccessForm({ onFinish }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + SPACING.md },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@assets/images/toys.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Registro completado</Text>
        <Text style={styles.subtitle}>
          Has finalizado con el registro, ahora puedes hacer uso de la
          aplicación.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={onFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  finishButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
});
