import { ComponentPropsWithoutRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';

type InputProps = ComponentPropsWithoutRef<typeof TextInput> & {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  required?: boolean;
  editable?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  variant?: 'standard' | 'minimal';
};

export function Input({
  label,
  labelStyle,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  required,
  disabled,
  editable,
  containerStyle,
  inputStyle,
  style,
  variant = 'standard',
  ...textInputProps
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          textInputProps.multiline && styles.inputWrapperMultiline,
          error ? styles.inputWrapperError : null,
          disabled ? styles.inputWrapperDisabled : null,
          style as StyleProp<ViewStyle>,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color={disabled ? COLORS.textMuted : COLORS.iconColor}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
            disabled ? styles.inputDisabled : null,
            inputStyle,
          ]}
          placeholderTextColor={COLORS.textMuted}
          editable={!disabled && editable !== false}
          {...textInputProps}
        />

        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.rightIcon}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name={rightIcon} size={18} color={COLORS.textMuted} />
          </Pressable>
        )}
      </View>

      {variant !== 'minimal' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
  },
  inputWrapperDisabled: {
    backgroundColor: COLORS.disabledButton,
    borderColor: COLORS.inputBorder,
    opacity: 0.6,
  },
  inputWrapperMultiline: {
    height: 'auto',
    minHeight: 52,
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  inputDisabled: {
    color: COLORS.textMuted,
  },
  inputWithLeftIcon: {
    paddingLeft: SPACING.sm,
  },
  inputWithRightIcon: {
    paddingRight: SPACING.sm,
  },
  leftIcon: {
    paddingLeft: SPACING.md,
  },
  rightIcon: {
    paddingRight: SPACING.md,
  },
  error: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
