import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  statusBarStyle?: "light" | "dark";
  backgroundColor?: string;
};

const ScreenLayout = ({
  children,
  statusBarStyle = "dark",
  backgroundColor = "#fff",
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top, backgroundColor }]}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
