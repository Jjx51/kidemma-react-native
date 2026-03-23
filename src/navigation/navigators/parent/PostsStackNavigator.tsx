import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { PostsStackParamList } from '../../types/parent.types';

import { PostsListScreen } from '@features/parent/posts/screens/PostsListScreen';

const Stack = createNativeStackNavigator<PostsStackParamList>();

export function PostsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="PostsList"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="PostsList" component={PostsListScreen} />
    </Stack.Navigator>
  );
}
