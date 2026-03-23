import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AdminHomeStackParamList } from '../../types/admin.types';

import { HomeScreen } from '@features/admin/home/screens/HomeScreen';

const Stack = createNativeStackNavigator<AdminHomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
