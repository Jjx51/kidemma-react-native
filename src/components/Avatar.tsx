import { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY } from '@theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 32,
  md: 44,
  lg: 64,
  xl: 88,
};

interface Props {
  name: string;
  size?: AvatarSize;
  imageUrl?: string;
  source?: any;
  badge?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({
  name,
  size = 'md',
  imageUrl,
  source,
  badge = false,
  style,
}: Props) {
  const dimension = SIZE_MAP[size];
  const [imageError, setImageError] = useState(false);

  const names = name.split(' ').slice(0, 2);
  const initials = names.reduce(
    (prev, curr) => prev + curr.charAt(0).toUpperCase(),
    '',
  );

  const hasImage = (imageUrl || source) && !imageError;

  return (
    <View style={{ width: dimension, height: dimension }}>
      <View
        style={[
          styles.avatarWrapper,
          { width: dimension, height: dimension, borderRadius: dimension / 2 },
          style,
        ]}
      >
        {hasImage ? (
          <Image
            source={imageUrl ? { uri: imageUrl } : source}
            style={[
              styles.image,
              {
                width: dimension,
                height: dimension,
                borderRadius: dimension / 2,
              },
            ]}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <Text style={styles.initial}>{initials}</Text>
        )}
      </View>
      {badge && (
        <View
          style={[
            styles.badge,
            {
              width: dimension / 4,
              height: dimension / 4,
              borderRadius: dimension / 8,
            },
          ]}
        >
          <Ionicons
            name="checkmark"
            size={dimension / 4 - 4}
            color={COLORS.white}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
  },
  initial: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
