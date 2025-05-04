import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main/home/HomeScreen";
import CustomerDetailScreen from "../screens/main/customerDetail/CustomerDetailScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{ headerShown: true, title: "Müşteri Detayı" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
