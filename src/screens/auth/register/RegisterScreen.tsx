import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Register.styles";
import { useNavigation } from "@react-navigation/native";
const RegisterScreen = () => {
  const navigation = useNavigation() as any;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
