// src/screens/main/settings/ProfileScreen.tsx

import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { styles } from "./Profile.styles";
import AuthContext from "../../../context/AuthContext";

const ProfileScreen = () => {
  const { logout }: any = useContext(AuthContext);
  const user = {
    name: "İbrahim Altsoy",
    phone: "+90 555 123 4567",
    business: "Altsoy Oto Yıkama",
    avatar: "https://via.placeholder.com/100", // ileride kullanıcıdan alınacak
  };
  const handleLogout = async () => {
    await logout();
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
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
