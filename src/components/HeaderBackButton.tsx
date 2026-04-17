import { Platform, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@theme';

type HeaderBackButtonProps = {
  onPress: () => void;
};

export function HeaderBackButton({ onPress }: HeaderBackButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
        size={24}
        color={COLORS.kdBlack}
      />
    </Pressable>
  );
}
