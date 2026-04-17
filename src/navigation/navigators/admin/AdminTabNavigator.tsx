import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AdminTabParamList } from '@navigation/types';
import { COLORS, TYPOGRAPHY } from '@theme';
import { MainTabsHeader } from '@components';
import { FamiliesListScreen } from '@features/admin/families/screens';
import { HomeScreen } from '@features/admin/home/screens';
import { ChildrenListScreen } from '@features/admin/children/screens';
import { OthersMenuScreen } from '@features/admin/others/screens';

const TAB_ICONS: Record<
  keyof AdminTabParamList,
  { active: string; inactive: string }
> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  ChildrenTab: { active: 'images', inactive: 'images-outline' },
  AgendaTab: { active: 'people', inactive: 'people-outline' },
  FamiliesTab: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
  OthersTab: { active: 'grid', inactive: 'grid-outline' },
};

const Tab = createBottomTabNavigator<AdminTabParamList>();

const screenOptions = ({ route }: { route: { name: string } }) => ({
  header: () => <MainTabsHeader />,
  tabBarActiveTintColor: COLORS.tabActive,
  tabBarInactiveTintColor: COLORS.tabInactive,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.inputBorder,
  },
  tabBarLabelStyle: {
    ...TYPOGRAPHY.caption,
  },
  tabBarIcon: ({
    focused,
    size,
    color,
  }: {
    focused: boolean;
    size: number;
    color: string;
  }) => {
    const icons = TAB_ICONS[route.name as keyof AdminTabParamList];
    const iconName = focused ? icons.active : icons.inactive;
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export function AdminTabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="ChildrenTab"
        component={ChildrenListScreen}
        options={{ tabBarLabel: 'Niños' }}
      />
      <Tab.Screen
        name="AgendaTab"
        component={ChildrenListScreen}
        options={{ tabBarLabel: 'Agenda' }}
      />
      <Tab.Screen
        name="FamiliesTab"
        component={FamiliesListScreen}
        options={{ tabBarLabel: 'Familias' }}
      />
      <Tab.Screen
        name="OthersTab"
        component={OthersMenuScreen}
        options={{ tabBarLabel: 'Otros' }}
      />
    </Tab.Navigator>
  );
}
