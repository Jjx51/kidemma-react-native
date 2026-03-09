import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@theme';
import { RootStackParamList } from '@navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function AppHeader() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  function onAvatarPress() {
    navigation.navigate('Profile');
  }

  function onNotificationPress() {
    navigation.navigate('Profile');
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + SPACING.sm }]}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={onAvatarPress}
        activeOpacity={0.8}
      >
        <Text style={styles.avatarText}>J</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/ic_kidemma_topbar.png')}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.8}>
        <IonIcon name="notifications" size={26} color={COLORS.title} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.white,
    ...SHADOWS.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundCard,
    borderColor: COLORS.inputBorder,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.kdBlack,
    fontWeight: '500',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 6,
    flex: 1,
    marginLeft: SPACING.sm
  }
});
