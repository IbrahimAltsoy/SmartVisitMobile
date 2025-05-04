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
import { Customer } from "../../types/customer/Customer";

const { width } = Dimensions.get("window");

interface CustomerDetailCardProps {
  customer: Customer;
}

const statusColors = {
  Bekliyor: "#F59E0B",
  "Teslim Edildi": "#10B981",
  İptal: "#EF4444",
};

const CustomerDetailCard: React.FC<CustomerDetailCardProps> = ({
  customer,
}) => {
  const statusText =
    customer?.status === 0
      ? "Bekliyor"
      : customer?.status === 1
      ? "Teslim Edildi"
      : "İptal";

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientHeader}
      >
        <View style={styles.profileSection}>
          {/* <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${customer.phone}` }}
            style={styles.avatar}
          /> */}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{customer.nameSurname}</Text>
            {/* <View style={styles.contactInfo}>
              <Ionicons name="call" size={16} color="white" />
              <Text style={styles.phone}>{customer.phone}</Text>
            </View> {/* <View style={styles.contactInfo}>
              <Ionicons name="call" size={16} color="white" />
              <Text style={styles.phone}>{customer.phone}</Text>
            </View> */}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View
          style={[styles.badge, { backgroundColor: statusColors[statusText] }]}
        >
          <Text style={styles.badgeText}>{statusText}</Text>
          <View style={styles.badgeDot} />
        </View>

        <View style={styles.timeContainer}>
          <Ionicons name="time" size={16} color="#94A3B8" />
          <Text style={styles.timeText}>
            {new Date(customer.createdDate).toLocaleString("tr-TR")}
          </Text>
        </View>
        {/* Ürün Açıklaması */}
        {customer.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ürün Açıklaması</Text>
            <Text style={styles.descriptionText}>{customer.description}</Text>
          </View>
        )}

        {Array.isArray(customer.photoUrls) && customer.photoUrls.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ürün Görselleri</Text>
            <FlatList
              data={customer.photoUrls}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
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

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.button, styles.callButton]}>
            <Ionicons name="call-outline" size={18} color="white" />
            <Text style={styles.buttonText}>Ara</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.messageButton]}>
            <Ionicons name="chatbubble-outline" size={18} color="white" />
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
  section: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    marginTop: 4,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 6,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  phone: {
    fontSize: 14,
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
    marginTop: 8,
    marginBottom: 16,
  },
  timeText: {
    marginLeft: 8,
    color: "#64748B",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
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
    fontSize: 14,
  },
});

export default CustomerDetailCard;
