import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';

interface EmptyStateProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}

export function EmptyState({ message, style }: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('@assets/images/toys_alt.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  image: {
    width: 100,
    height: 100,
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
