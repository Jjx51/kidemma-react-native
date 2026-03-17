import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../../types/parent.types';

import { HomeScreen } from '@features/parent/home/screens/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
