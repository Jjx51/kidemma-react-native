import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';

import { COLORS, SPACING, SHADOWS } from '@theme';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function Card({ children, style, onPress }: Props) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={[styles.card, style]}>{children}</View>
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  pressed: {
    opacity: 0.8,
  },
});
