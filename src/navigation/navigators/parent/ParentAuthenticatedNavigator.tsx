import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ParentAuthenticatedParamList } from "@navigation/types";
import { ProfileScreen } from "@features/profile/screens";
import { ParentTabNavigator } from "./ParentTabNavigator";

const Stack = createNativeStackNavigator<ParentAuthenticatedParamList>();

export function ParentAuthenticatedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentTabs" component={ParentTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* add more root-level screens here later */}
    </Stack.Navigator>
  );
}
