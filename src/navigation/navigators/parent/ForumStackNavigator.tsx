import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ForumStackParamList } from '../../types/parent.types';

import { ForumListScreen } from '@features/parent/forum/screens/ForumListScreen';

const Stack = createNativeStackNavigator<ForumStackParamList>();

export function ForumStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ForumList"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ForumList" component={ForumListScreen} />
    </Stack.Navigator>
  );
}
