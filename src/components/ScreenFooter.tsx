import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SPACING } from '@theme';

interface ScreenFooterProps {
  children: React.ReactNode;
}

export function ScreenFooter({ children }: ScreenFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.footer, { paddingBottom: insets.bottom + SPACING.md }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
});
