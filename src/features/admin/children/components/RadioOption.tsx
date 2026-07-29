import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function RadioOption({
  label,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.radio,
            selected && styles.radioSelected,
          ]}
        >
          {selected && (
            <Ionicons
              name="checkmark"
              size={14}
              color={COLORS.white}
            />
          )}
        </View>

        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
  },

  pressed: {
    opacity: 0.6,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  radioSelected: {
    backgroundColor: COLORS.primary,
  },

  label: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
});