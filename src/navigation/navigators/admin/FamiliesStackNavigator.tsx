import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { AdminStackParamList } from '@navigation/types';
import {
  NewFamilyFormScreen,
  AddChildScreen,
  AddMemberScreen,
  FamilyMembersScreen,
  FamilyChildrenScreen,
  CreateFamilySummaryScreen,
} from '@features/admin/families/screens';
import { COLORS, TYPOGRAPHY } from '@theme';

const Stack = createNativeStackNavigator<AdminStackParamList>();

export function FamiliesStackNavigator() {
  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: { backgroundColor: COLORS.white },
    headerTintColor: COLORS.title,
    headerTitleStyle: { ...TYPOGRAPHY.sectionTitle },
    headerBackVisible: true,
    headerShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal' as const,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="NewFamilyForm"
        component={NewFamilyFormScreen}
        options={{
          title: 'Crear familia',
        }}
      />
      <Stack.Screen
        name="FamilyMembers"
        component={FamilyMembersScreen}
        options={{ title: 'Miembros' }}
      />
      <Stack.Screen
        name="AddMember"
        component={AddMemberScreen}
        options={{ title: 'Agregar Miembro' }}
      />
      <Stack.Screen
        name="FamilyChildren"
        component={FamilyChildrenScreen}
        options={{ title: 'Hijos' }}
      />
      <Stack.Screen
        name="AddChild"
        component={AddChildScreen}
        options={{ title: 'Agregar hijo' }}
      />
      <Stack.Screen
        name="CreateFamilySummary"
        component={CreateFamilySummaryScreen}
        options={{ title: 'Crear familia' }}
      />
    </Stack.Navigator>
  );
}
