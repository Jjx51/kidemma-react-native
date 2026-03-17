import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import type { Child } from '@types';

interface Props {
  children: Child[];
  onContinue: () => void;
}

export function ConfirmChildrenForm({ children, onContinue }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + SPACING.md },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Registro de hijos</Text>
        <Text style={styles.subtitle}>
          Tenemos los siguientes hijos vinculados a tu cuenta.
        </Text>

        <View style={styles.childrenRow}>
          {children.map((child, index) => (
            <View key={index} style={styles.childOption}>
              <View
                style={[
                  styles.childAvatar,
                  index === 0 && styles.childAvatarSelected,
                ]}
              >
                <Image
                  source={
                    child.gender === 'female'
                      ? require('@assets/images/girl.png')
                      : require('@assets/images/boy.png')
                  }
                  style={styles.childAvatarImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.childName}>{child.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
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
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  childrenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  childOption: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  childAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  childAvatarSelected: {
    borderColor: COLORS.primary,
  },
  childAvatarImage: {
    width: 64,
    height: 64,
  },
  childName: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
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
  continueButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
});
