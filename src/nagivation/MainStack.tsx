import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main/home/HomeScreen";
import CustomerScreen from "../screens/main/customer/CustomerScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Customer" component={CustomerScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
