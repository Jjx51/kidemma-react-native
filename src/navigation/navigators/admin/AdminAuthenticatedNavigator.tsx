import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminAuthenticatedParamList } from '@navigation/types';
import { ProfileScreen } from '@features/profile/screens';
import { AdminTabNavigator } from './AdminTabNavigator';
import { FamiliesStackNavigator } from './FamiliesStackNavigator';

const Stack = createNativeStackNavigator<AdminAuthenticatedParamList>();

export function AdminAuthenticatedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name='Families' component={FamiliesStackNavigator} />
    </Stack.Navigator>
  );
}
