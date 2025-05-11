import React, { useContext, useState, useMemo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AuthContext from "../../../context/AuthContext";
import StatusUpdateModal from "../../../modals/customer/StatusUpdateModal";
import { CustomerStatus } from "../../../types/enum/CustomerStatus";

const ProfileScreen = () => {
  const { logout }: any = useContext(AuthContext);

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<CustomerStatus | null>(
    null
  );

  const user = {
    name: "İbrahim Altsoy",
    phone: "+90 555 123 4567",
    business: "Altsoy Oto Yıkama",
    avatar: "https://via.placeholder.com/100",
    status: CustomerStatus.Waiting, // test için
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleStatusUpdate = (newStatus: CustomerStatus) => {
    console.log("Yeni durum seçildi:", newStatus);
    setSelectedStatus(newStatus);
    setStatusModalVisible(false);
  };

  const currentStatus = useMemo(() => {
    return selectedStatus ?? user.status;
  }, [selectedStatus, user.status]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>{user.business}</Text>
      <Text style={styles.info}>{user.phone}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setStatusModalVisible(true)}
      >
        <Text style={styles.buttonText}>Profili Düzenle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>

      {/* Burada dışarıdan gelen StatusUpdateModal kullanılıyor */}
      <StatusUpdateModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        onStatusSelect={handleStatusUpdate}
        currentStatus={currentStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
