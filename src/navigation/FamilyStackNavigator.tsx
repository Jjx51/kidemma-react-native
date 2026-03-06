import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { FamilyStackParamList } from './types';

import { FamilyScreen } from '@features/family/screens/FamilyScreen';

const Stack = createNativeStackNavigator<FamilyStackParamList>();

export function FamilyStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="FamilyHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="FamilyHome" component={FamilyScreen} />
    </Stack.Navigator>
  );
}
