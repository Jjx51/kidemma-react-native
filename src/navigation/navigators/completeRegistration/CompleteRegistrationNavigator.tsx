import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { CompleteRegistrationStackParamList } from '@navigation/types';
import {
  CompleteRegistrationFormScreen,
  ConfirmChildrenScreen,
  RegistrationSuccessScreen,
  CompleteChildScreen,
} from '@features/registration/screens';
import { COLORS, TYPOGRAPHY } from '@theme';

const Stack = createNativeStackNavigator<CompleteRegistrationStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerTintColor: COLORS.title,
  headerTitleStyle: { ...TYPOGRAPHY.sectionTitle },
  headerShown: true,
  headerBackVisible: true,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal' as const,
};

export function CompleteRegistrationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CompleteRegistrationForm"
        component={CompleteRegistrationFormScreen}
      />
      <Stack.Screen name="ConfirmChildren" component={ConfirmChildrenScreen} />
      <Stack.Screen
        name="CompleteChildForm"
        component={CompleteChildScreen}
        options={{
          ...screenOptions,
          title: 'Completar datos',
        }}
      />
      <Stack.Screen
        name="RegistrationSuccess"
        component={RegistrationSuccessScreen}
      />
    </Stack.Navigator>
  );
}
