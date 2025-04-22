import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/main/home/HomeScreen";
import CustomerScreen from "../screens/main/customer/CustomerScreen";
import ScreenLayout from "../components/layout/ScreenLayout";
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
            case "Home":
              iconName = "home-outline";
              break;
            case "Customer":
              iconName = "person-outline";
              break;
            case "Reports":
              iconName = "bar-chart-outline";
              break;
            case "Profile":
              iconName = "settings-outline";
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => (
          <ScreenLayout>
            <HomeScreen />
          </ScreenLayout>
        )}
      />
      <Tab.Screen
        name="Customer"
        children={() => (
          <ScreenLayout>
            <CustomerScreen />
          </ScreenLayout>
        )}
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ScreenLayout>
            <ProfileScreen />
          </ScreenLayout>
        )}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
