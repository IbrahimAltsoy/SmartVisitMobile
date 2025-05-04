import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

import { styles } from "./Splash.styles";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash-icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>SmartVisit</Text>
      <Text style={styles.slogan}>Sırada beklemek tarih oldu</Text>
      <ActivityIndicator
        size="small"
        color="#6366F1"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};



export default SplashScreen;
