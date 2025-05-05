import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Dimensions,
  Linking,
} from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Customer } from "../../types/customer/Customer";

interface CustomerCardProps {
  customer: Customer;
  onDetailPress?: (id: string) => void;
  index: number;
}

const statusColors = {
  Bekliyor: "#F59E0B",
  "Teslim Edildi": "#047857",
  İptal: "#EF4444",
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onDetailPress,
  index,
}) => {
  const scale = useSharedValue(1);
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const statusText = useMemo(() => {
    switch (customer?.status) {
      case 0:
        return "Bekliyor";
      case 1:
        return "Teslim Edildi";
      default:
        return "İptal";
    }
  }, [customer?.status]);

  const handleCall = () => {
    if (customer.phone) Linking.openURL(`tel:${customer.phone}`);
    else alert("Telefon numarası bulunamadı.");
  };

  const handleMessage = () => {
    const phone = customer.phone.replace(/\s+/g, "").replace("+", "");
    const message = "Merhaba,";
    Linking.openURL(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    );
  };

  const handleDetail = () => {
    onDetailPress?.(customer.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => (scale.value = withSpring(0.98))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={handleDetail}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            borderLeftColor: statusColors[statusText],
            width: width - 32,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={[styles.name, { color: statusColors[statusText] }]}>
              {index + 1}-{customer.nameSurname}
            </Text>
            <Text style={styles.phone}>{customer.description}</Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: statusColors[statusText] },
            ]}
          >
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{statusText}</Text>
          </View>
        </View>

        <View style={styles.actionBar}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { borderColor: statusColors[statusText] },
            ]}
            onPress={handleCall}
          >
            <Ionicons name="call" size={18} color="#3B82F6" />
            <Text style={styles.actionText}>Ara</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
            <Ionicons name="chatbubble" size={18} color="#10B981" />
            <Text style={styles.actionText}>Mesaj</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDetail}>
            <Ionicons name="document" size={18} color="#6366F1" />
            <Text style={styles.actionText}>Detay</Text>
          </TouchableOpacity>
        </View>

        {modalVisible && (
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <FlatList
              data={customer.photoUrls}
              horizontal
              pagingEnabled
              initialScrollIndex={startIndex}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
                  <View style={styles.modalBackground}>
                    <Image
                      source={{ uri: item }}
                      style={styles.modalImage}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </Modal>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 4,
    padding: 8,
    borderRadius: 12,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    alignSelf: "center",
  },
  name: { fontSize: 13, fontWeight: "600", marginBottom: 1 },
  phone: { fontSize: 16, color: "#000", marginBottom: 1 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  userInfo: { flex: 1 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginRight: 6,
  },
  badgeText: { fontSize: 12, color: "#fff", fontWeight: "500" },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 6,
    marginTop: 6,
  },
  actionButton: { alignItems: "center", paddingHorizontal: 4 },
  actionText: { fontSize: 11, color: "#64748B", marginTop: 2 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  modalImage: { width: "90%", height: "70%", borderRadius: 12 },
});

export default React.memo(CustomerCard);
