import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/nagivation/Router";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
