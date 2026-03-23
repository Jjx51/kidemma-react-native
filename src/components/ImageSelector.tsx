import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { Avatar, AvatarSize } from './Avatar';

export interface ImageSelectorOption<T extends string> {
  value: T;
  label: string;
  source: any;
}

interface Props<T extends string> {
  options: ImageSelectorOption<T>[];
  selected: T;
  onChange: (value: T) => void;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

export function ImageSelector<T extends string>({
  options,
  selected,
  onChange,
  size = 'lg',
  style,
}: Props<T>) {
  return (
    <View style={[styles.container, style]}>
      {options.map(option => {
        const isActive = selected === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={styles.item}
            onPress={() => onChange(option.value)}
            activeOpacity={0.8}
          >
            <Avatar
              name={option.label}
              source={option.source}
              size={size}
              style={[styles.avatar, isActive && styles.avatarActive]}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
    marginTop: SPACING.xs,
  },
  item: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  avatar: {
    borderColor: 'transparent',
  },
  avatarActive: {
    borderColor: COLORS.primary,
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
