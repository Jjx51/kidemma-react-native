import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SPACING, LAYOUT, TYPOGRAPHY } from '@theme';
import { BrandHeader } from '../components/BrandHeader';
import { LoginForm } from '../components/LoginForm';

export function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BrandHeader />

          <LoginForm />

          <TouchableOpacity
            style={styles.adminLink}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.adminLinkText}>
              Toca aquí para ir al acceso administrador
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    justifyContent: 'space-between',
  },
  adminLink: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  adminLinkText: {
    ...TYPOGRAPHY.caption,
    textDecorationLine: 'underline',
  },
});
