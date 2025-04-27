import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface CustomerDetailCardProps {
  name: string;
  phoneNumber: string;
  time: string;
  status: "Bekliyor" | "Teslim Edildi" | "İptal";
  productImages?: string[];
}

const statusColors = {
  Bekliyor: "#F59E0B",
  "Teslim Edildi": "#10B981",
  İptal: "#EF4444",
};

const CustomerDetailCard: React.FC<CustomerDetailCardProps> = ({
  name,
  phoneNumber,
  time,
  status,
  productImages = [],
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientHeader}
      >
        <View style={styles.profileSection}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${phoneNumber}` }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.contactInfo}>
              <Ionicons name="call" size={16} color="white" />
              <Text style={styles.phone}>{phoneNumber}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content Area */}
      <View style={styles.content}>
        {/* Status Badge */}
        <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
          <Text style={styles.badgeText}>{status}</Text>
          <View style={styles.badgeDot} />
        </View>

        {/* Time Info */}
        <View style={styles.timeContainer}>
          <Ionicons name="time" size={18} color="#64748B" />
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {/* Product Gallery */}
        {productImages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ürün Görselleri</Text>
            <FlatList
              data={productImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.8}>
                  <Image source={{ uri: item }} style={styles.productImage} />
                  <View style={styles.imageOverlay} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.imageList}
            />
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.button, styles.messageButton]}>
            <Ionicons name="chatbubble" size={20} color="white" />
            <Text style={styles.buttonText}>Mesaj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  gradientHeader: {
    padding: 24,
    paddingBottom: 60,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  phone: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginLeft: 8,
  },
  content: {
    marginTop: -40,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    paddingTop: 32,
  },
  badge: {
    position: "absolute",
    top: -15,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  timeText: {
    marginLeft: 8,
    color: "#64748B",
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  imageList: {
    paddingBottom: 8,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "48%",
  },
  callButton: {
    backgroundColor: "#3B82F6",
  },
  messageButton: {
    backgroundColor: "#10B981",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default CustomerDetailCard;
