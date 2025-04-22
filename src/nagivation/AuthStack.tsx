import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";
import ScreenLayout from "../components/layout/ScreenLayout";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        children={() => (
          <ScreenLayout>
            <LoginScreen />
          </ScreenLayout>
        )}
      />
      <Stack.Screen
        name="Register"
        children={() => (
          <ScreenLayout>
            <RegisterScreen />
          </ScreenLayout>
        )}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
