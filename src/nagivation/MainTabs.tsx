import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack"; // Home artık stack
import CustomerScreen from "../screens/main/customer/CustomerScreen";
import ProfileScreen from "../screens/main/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "HomeTab":
              iconName = "home-outline";
              break;
            case "Customer":
              iconName = "person-outline";
              break;
            case "Profile":
              iconName = "settings-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Ana Sayfa" }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{ title: "Müşteri" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
