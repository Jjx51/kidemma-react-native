import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { PostsStackParamList } from './types';

import { PostsListScreen } from '@features/posts/screens/PostsListScreen';

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
