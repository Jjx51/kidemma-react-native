import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@features/auth';
import { COLORS } from '@theme';
import { ProfileScreen } from '@features/profile/screens';
import type { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

const Root = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <View style={styles.view}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isAuthenticated ? (
        <>
          <Root.Screen name="Main" component={MainTabNavigator} />
          <Root.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              animation: 'slide_from_right'
            }}
          />
        </>
      ) : (
        <Root.Screen name="Auth" component={AuthNavigator} />
      )}
    </Root.Navigator>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
