import React, { useState } from "react";
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

interface CustomerCardProps {
  name: string;
  time: string;
  status: "Bekliyor" | "Teslim Edildi" | "İptal";
  phoneNumber: string;
  productImages?: string[];
  onDetailPress?: () => void;
  index: number;
}

const statusColors = {
  Bekliyor: "#F59E0B",
  "Teslim Edildi": "#10B981",
  İptal: "#EF4444",
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  time,
  status,
  phoneNumber,
  productImages = [],
  onDetailPress,
  index,
}) => {
  const scale = useSharedValue(1);
  const { width } = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            borderLeftColor: statusColors[status],
            width: width - 32,
          },
        ]}
      >
        {/* Üst Bilgi */}
        <View style={styles.header}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${phoneNumber}` }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>
              {index + 1}-{name}
            </Text>
            <Text style={styles.phone}>{phoneNumber}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View
            style={[styles.badge, { backgroundColor: statusColors[status] }]}
          >
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </View>

        {/* Ürün Görselleri */}
        {productImages.length > 0 && (
          <FlatList
            data={productImages}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index: imgIndex }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setStartIndex(imgIndex);
                  setModalVisible(true);
                }}
                style={styles.imageTouchable}
              >
                <Image
                  source={{ uri: item }}
                  style={styles.productImageHorizontal}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.imageRow}
          />
        )}

        {/* Aksiyon Butonları */}
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (phoneNumber) {
                Linking.openURL(`tel:${phoneNumber}`);
              } else {
                alert("Telefon numarası bulunamadı.");
              }
            }}
          >
            <Ionicons name="call" size={18} color="#3B82F6" />
            <Text style={styles.actionText}>Ara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              const phoneWithoutSpaces = phoneNumber.replace(/\s+/g, ""); // Boşlukları temizliyoruz
              const message = "Merhaba,";
              Linking.openURL(
                `https://wa.me/${phoneWithoutSpaces.replace(
                  "+",
                  ""
                )}?text=${encodeURIComponent(message)}`
              );
            }}
          >
            <Ionicons name="chatbubble" size={18} color="#10B981" />
            <Text style={styles.actionText}>Mesaj</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onDetailPress}>
            <Ionicons name="document" size={18} color="#6366F1" />
            <Text style={styles.actionText}>Detay</Text>
          </TouchableOpacity>
        </View>

        {/* Modal - Fotoğraf Galeri */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <FlatList
            data={productImages}
            horizontal
            pagingEnabled
            initialScrollIndex={startIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 4,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: "#94A3B8",
  },
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
  badgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  imageRow: {
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: "row",
  },
  imageTouchable: {
    marginRight: 8,
  },
  productImageHorizontal: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
    marginTop: 8,
  },
  actionButton: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  modalImage: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
  },
});

export default CustomerCard;
