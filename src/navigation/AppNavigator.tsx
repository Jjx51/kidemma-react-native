import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '@features/auth';
import type { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

const Root = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isAuthenticated ? (
        <Root.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Root.Screen name="Auth" component={AuthNavigator} />
      )}
    </Root.Navigator>
  );
}
