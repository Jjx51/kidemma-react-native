import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';

import { COLORS } from '@theme';

type Child = {
  id: string;
  name: string;
  age: string;
  image: ImageSourcePropType;
  classDays: string[];
};

type Props = {
  child: Child;
  onPress?: () => void;
};

export function GridChildItem({ child, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={child.image}
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>

      <Text
        style={styles.name}
        numberOfLines={2}
      >
        {child.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.7,
  },

  avatarContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: '#B56A56',
  },

  avatar: {
    width: 54,
    height: 54,
  },

  name: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textDark,
  },
});