import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';

import { COLORS, FONTS, FONT_SIZE } from '@theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  isLoading = false,
  fullWidth = true,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles[`${variant}Disabled`],
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.85}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? COLORS.primaryButtonText
              : COLORS.primaryButton
          }
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            styles[`${variant}Label`],
            isDisabled && styles[`${variant}LabelDisabled`],
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // ─── Base ──────────────────────────────────────────────────────────────────
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },

  // ─── Primary ───────────────────────────────────────────────────────────────
  primary: {
    backgroundColor: COLORS.primaryButton,
  },
  primaryDisabled: {
    backgroundColor: COLORS.disabledButton,
  },
  primaryLabel: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryButtonText,
  },
  primaryLabelDisabled: {
    color: COLORS.disabledButtonText,
  },

  // ─── Secondary ─────────────────────────────────────────────────────────────
  secondary: {
    backgroundColor: COLORS.secondaryButton,
    borderWidth: 1.5,
    borderColor: COLORS.secondaryButtonBorder,
  },
  secondaryDisabled: {
    backgroundColor: COLORS.disabledButton,
    borderColor: COLORS.disabledButton,
  },
  secondaryLabel: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.secondaryButtonText,
  },
  secondaryLabelDisabled: {
    color: COLORS.disabledButtonText,
  },

  // ─── Ghost ─────────────────────────────────────────────────────────────────
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostDisabled: {
    backgroundColor: 'transparent',
  },
  ghostLabel: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.ghostButton,
  },
  ghostLabelDisabled: {
    color: COLORS.disabledButtonText,
  },

  // ─── Shared label ──────────────────────────────────────────────────────────
  label: {
    // base label — overridden per variant above
  },
});
