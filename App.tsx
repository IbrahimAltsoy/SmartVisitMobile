import { StatusBar } from "expo-status-bar";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import Router from "./src/nagivation/Router";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
