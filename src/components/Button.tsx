import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@theme';

type ButtonVariant = 'primary' | 'outline' | 'text';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const containerStyles: Record<ButtonVariant, StyleProp<ViewStyle>> = {
    primary: styles.primary,
    outline: styles.outline,
    text: styles.text,
  };

  const labelStyles: Record<ButtonVariant, StyleProp<TextStyle>> = {
    primary: styles.labelPrimary,
    outline: styles.labelOutline,
    text: styles.labelText,
  };

  const indicatorColor: Record<ButtonVariant, string> = {
    primary: COLORS.white,
    outline: COLORS.primary,
    text: COLORS.primary,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        containerStyles[variant],
        isDisabled && variant !== 'text' && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor[variant]} size="small" />
      ) : (
        <Text
          style={[
            styles.label,
            labelStyles[variant],
            isDisabled &&
              (variant === 'text'
                ? styles.labelTextDisabled
                : styles.labelDisabled),
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabled: {
    backgroundColor: COLORS.disabledButton,
    borderColor: 'transparent',
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    ...TYPOGRAPHY.buttonPrimary,
  },
  labelPrimary: {
    color: COLORS.white,
  },
  labelOutline: {
    color: COLORS.primary,
  },
  labelDisabled: {
    color: COLORS.textMuted,
  },
  text: {
    backgroundColor: 'transparent',
    height: 'auto',
    paddingHorizontal: 0,
  },
  labelText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  labelTextDisabled: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    textDecorationLine: 'none',
  },
});
