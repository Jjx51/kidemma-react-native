import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disableTopInset?: boolean;
}

export function ScreenContainer({
  children,
  style,
  disableTopInset,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = disableTopInset ? SPACING.md : insets.top;

  return (
    <View style={[styles.container, { paddingTop }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
  },
});
