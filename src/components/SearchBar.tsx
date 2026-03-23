import { ComponentPropsWithoutRef } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, SPACING, SHADOWS } from '@theme';

type SearchBarProps = ComponentPropsWithoutRef<typeof TextInput> & {
  onFilterPress?: () => void;
  filterActive?: boolean;
};

export function SearchBar({
  onFilterPress,
  filterActive = false,
  ...textInputProps
}: SearchBarProps) {
  return (
    <View style={styles.row}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholderTextColor={COLORS.textMuted}
          style={styles.input}
          {...textInputProps}
        />
        <Ionicons name="search-outline" size={20} color={COLORS.textMuted} />
      </View>

      {onFilterPress && (
        <Pressable
          onPress={onFilterPress}
          style={[
            styles.filterButton,
            filterActive && styles.filterButtonActive,
          ]}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={filterActive ? COLORS.white : COLORS.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginVertical: SPACING.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    height: 48,
    ...SHADOWS.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
});
