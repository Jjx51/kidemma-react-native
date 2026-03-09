import React from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { hide as hideSplash} from 'react-native-bootsplash';

import { useAuth } from '@features/auth';
import { ProfileScreen } from '@features/profile/screens';
import type { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

const Root = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing) {
      hideSplash({ fade: true });
    }
  }, [isInitializing]);

  if (isInitializing) return null;

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
