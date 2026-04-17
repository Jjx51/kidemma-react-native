import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { OthersStackParamList } from '../../types/parent.types';

import { OthersMenuScreen } from '@features/parent/others/screens';

const Stack = createNativeStackNavigator<OthersStackParamList>();

export function OthersStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OthersMenu"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="OthersMenu" component={OthersMenuScreen} />
    </Stack.Navigator>
  );
}
