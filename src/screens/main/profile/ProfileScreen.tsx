// src/screens/main/settings/ProfileScreen.tsx

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { styles } from "./Profile.styles";

const ProfileScreen = () => {
  const user = {
    name: "İbrahim Altsoy",
    phone: "+90 555 123 4567",
    business: "Altsoy Oto Yıkama",
    avatar: "https://via.placeholder.com/100", // ileride kullanıcıdan alınacak
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>{user.business}</Text>
      <Text style={styles.info}>{user.phone}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Profili Düzenle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
