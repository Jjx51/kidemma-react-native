import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { hide as hideSplash } from 'react-native-bootsplash';

import { LoginScreen, useAuth } from '@features/auth';
import { UserRole } from '@kdTypes';
import type { RootStackParamList } from '../../types';
import { CompleteRegistrationNavigator } from '../completeRegistration/CompleteRegistrationNavigator';
import { AdminAuthenticatedNavigator } from '../admin/AdminAuthenticatedNavigator';
import { ParentAuthenticatedNavigator } from '../parent/ParentAuthenticatedNavigator';
import { useEffect } from 'react';

const Root = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, isInitializing, user } = useAuth();

  const isAdmin = user?.role === UserRole.Admin;
  const isProfileComplete = user?.isProfileComplete ?? false;

  useEffect(() => {
    if (!isInitializing) {
      hideSplash({ fade: true });
    }
  }, [isInitializing]);

  if (isInitializing) return null;

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {!isAuthenticated ? (
        <Root.Screen name="Login" component={LoginScreen} />
      ) : !isProfileComplete ? (
        <Root.Screen
          name="CompleteRegistration"
          component={CompleteRegistrationNavigator}
        />
      ) : isAdmin ? (
        <Root.Screen name="Admin" component={AdminAuthenticatedNavigator} />
      ) : (
        <Root.Screen name="Main" component={ParentAuthenticatedNavigator} />
      )}
    </Root.Navigator>
  );
}
