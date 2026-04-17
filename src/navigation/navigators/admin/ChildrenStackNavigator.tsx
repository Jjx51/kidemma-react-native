import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminChildrenStackParamList } from '@navigation/types';
import { ChildrenListScreen } from '@features/admin/children/screens';

const Stack = createNativeStackNavigator<AdminChildrenStackParamList>();

export function ChildrenStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChildrenList" component={ChildrenListScreen} />
    </Stack.Navigator>
  );
}
