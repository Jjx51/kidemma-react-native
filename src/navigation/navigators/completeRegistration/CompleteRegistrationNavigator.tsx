import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CompleteRegistrationStackParamList } from '@navigation/types';
import { CompleteRegistrationFormScreen } from '@features/registration/screens/CompleteRegistrationScreen';
import { ConfirmChildrenScreen } from '@features/registration/screens/ConfirmChildrenScreen';
import { RegistrationSuccessScreen } from '@features/registration/screens/RegistrationSuccessScreen';

const Stack = createNativeStackNavigator<CompleteRegistrationStackParamList>();

export function CompleteRegistrationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CompleteRegistrationForm"
        component={CompleteRegistrationFormScreen}
      />
      <Stack.Screen name="ConfirmChildren" component={ConfirmChildrenScreen} />
      <Stack.Screen
        name="RegistrationSuccess"
        component={RegistrationSuccessScreen}
      />
    </Stack.Navigator>
  );
}
