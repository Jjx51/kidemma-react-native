import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminOthersStackParamList } from '@navigation/types';
import { OthersMenuScreen } from '@features/admin/others/screens';

const Stack = createNativeStackNavigator<AdminOthersStackParamList>();

export function AdminOthersStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminSettings" component={OthersMenuScreen} />
    </Stack.Navigator>
  );
}
