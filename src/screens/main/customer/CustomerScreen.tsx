import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./Customer.styles";
import { useNavigation } from "@react-navigation/native";
const CustomerScreen = () => {
  const navigation = useNavigation() as any;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Screen</Text>
      <Button
        title="Müşteri detayına git"
        onPress={() => navigation.navigate("CustomerDetail")}
      />
      <Button
        title="Anasayfa detayına git"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default CustomerScreen;
