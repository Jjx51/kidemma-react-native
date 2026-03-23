import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';

type ScreenHeaderProps = (
  | { title: string; subtitle?: string }
  | { title?: string; subtitle: string }
) & {
  style?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  subtitleStyles?: StyleProp<TextStyle>;
};

export function ScreenHeader({
  title,
  subtitle,
  style,
  titleStyles,
  subtitleStyles,
}: ScreenHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={[styles.title, titleStyles]}>{title}</Text>}
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyles]}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
    fontSize: 28,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'center',
  },
});
