import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@theme';
import { MainTabsHeader } from '@components';
import type { ParentTabParamList } from '../../types';
import { HomeStackNavigator } from './HomeStackNavigator';
import { PostsStackNavigator } from './PostsStackNavigator';
import { FamilyStackNavigator } from './FamilyStackNavigator';
import { ForumStackNavigator } from './ForumStackNavigator';
import { OthersStackNavigator } from './OthersStackNavigator';

const TAB_ICONS: Record<
  keyof ParentTabParamList,
  { active: string; inactive: string }
> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  PostsTab: { active: 'images', inactive: 'images-outline' },
  FamilyTab: { active: 'people', inactive: 'people-outline' },
  ForumTab: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
  OthersTab: { active: 'grid', inactive: 'grid-outline' },
};

const Tab = createBottomTabNavigator<ParentTabParamList>();

const screenOptions = ({ route }: { route: { name: string } }) => ({
  header: () => <MainTabsHeader />,
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
    const icons = TAB_ICONS[route.name as keyof ParentTabParamList];
    const iconName = focused ? icons.active : icons.inactive;
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export function ParentTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeTab" screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="PostsTab"
        component={PostsStackNavigator}
        options={{ tabBarLabel: 'Posts' }}
      />
      <Tab.Screen
        name="FamilyTab"
        component={FamilyStackNavigator}
        options={{ tabBarLabel: 'Mi familia' }}
      />
      <Tab.Screen
        name="ForumTab"
        component={ForumStackNavigator}
        options={{ tabBarLabel: 'Foro' }}
      />
      <Tab.Screen
        name="OthersTab"
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
