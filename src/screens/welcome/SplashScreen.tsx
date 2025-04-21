import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Splash.styles";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
