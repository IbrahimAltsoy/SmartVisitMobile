// src/navigation/RootStack.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";

// Ekranlar
import CustomerDetailScreen from "../screens/main/customerDetail/CustomerDetailScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* Alt tab yapısını kapsayan ana ekran */}
      <Stack.Screen
        name="Geri"
        component={MainStack}
        options={{ headerShown: false }} // çünkü tab'ların kendi tab bar'ı var
      />

      {/* Customer ekranından yönlenecek detay ekranlar */}
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{ title: "Müşteri Detay", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
