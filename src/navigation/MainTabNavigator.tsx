import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { MainTabParamList } from './types';
import { HomeStackNavigator } from './HomeStackNavigator';
import { PostsStackNavigator } from './PostsStackNavigator';
import { FamilyStackNavigator } from './FamilyStackNavigator';
import { ForumStackNavigator } from './ForumStackNavigator';
import { OthersStackNavigator } from './OthersStackNavigator';
import { COLORS } from '@theme';

const TAB_ICONS: Record<
  keyof MainTabParamList,
  { active: string; inactive: string }
> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Posts: { active: 'images', inactive: 'images-outline' },
  Family: { active: 'people', inactive: 'people-outline' },
  Forum: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
  Others: { active: 'grid', inactive: 'grid-outline' },
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const screenOptions = ({ route }: { route: { name: string } }) => ({
  headerShown: false,
  tabBarActiveTintColor: COLORS.tabActive,
  tabBarInactiveTintColor: COLORS.tabInactive,
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabLabel,
  tabBarIcon: ({
    focused,
    size,
    color,
  }: {
    focused: boolean;
    size: number;
    color: string;
  }) => {
    const icons = TAB_ICONS[route.name as keyof MainTabParamList];
    const iconName = focused ? icons.active : icons.inactive;
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsStackNavigator}
        options={{ tabBarLabel: 'Posts' }}
      />
      <Tab.Screen
        name="Family"
        component={FamilyStackNavigator}
        options={{ tabBarLabel: 'Mi familia' }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumStackNavigator}
        options={{ tabBarLabel: 'Foro' }}
      />
      <Tab.Screen
        name="Others"
        component={OthersStackNavigator}
        options={{ tabBarLabel: 'Otros' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
