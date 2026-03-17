import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, useAuth } from '@features/auth';
import { COLORS } from '@theme';
import { UserRole } from '@features/auth/enums';
import type { RootStackParamList } from '../../types';
import { CompleteRegistrationNavigator } from '../completeRegistration/CompleteRegistrationNavigator';
import { AdminAuthenticatedNavigator } from '../admin/AdminAuthenticatedNavigator';
import { ParentAuthenticatedNavigator } from '../parent/ParentAuthenticatedNavigator';

const Root = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, isInitializing, user } = useAuth();

  const isAdmin = user?.role === UserRole.Admin;
  const isProfileComplete = user?.isProfileComplete ?? false;

  if (isInitializing) {
    return (
      <View style={styles.view}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
