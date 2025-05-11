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
import { CustomerStatus } from "../../types/enum/CustomerStatus";

interface CustomerCardProps {
  customer: Customer;
  onDetailPress?: (id: string) => void;
  onStatusPress?: (id: string) => void;
  index: number;
}

const STATUS_COLORS: Record<CustomerStatus, string> = {
  [CustomerStatus.Waiting]: "#F59E0B",
  [CustomerStatus.Delivered]: "#047857",
  [CustomerStatus.Canceled]: "#EF4444",
};

const STATUS_LABELS: Record<CustomerStatus, string> = {
  [CustomerStatus.Waiting]: "Bekliyor",
  [CustomerStatus.Delivered]: "Teslim Edildi",
  [CustomerStatus.Canceled]: "İptal",
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onDetailPress,
  onStatusPress,
  index,
}) => {
  const scale = useSharedValue(1);
  const { width } = useWindowDimensions();
  const statusText = useMemo(() => {
    return STATUS_LABELS[customer.status as CustomerStatus];
  }, [customer.status]);

  const formattedDate = useMemo(() => {
    const date = new Date(customer.createdDate);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
    };
    const formatted = date.toLocaleString("tr-TR", options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }, [customer.createdDate]);

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
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale }],
          borderLeftColor: STATUS_COLORS[customer.status as CustomerStatus],
          width: width - 32,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.rowBetween}>
            <Text
              style={[
                styles.name,
                { color: STATUS_COLORS[customer.status as CustomerStatus] },
              ]}
            >
              {index + 1} - {customer.nameSurname}
            </Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <Text style={styles.phone}>
            {customer.description?.slice(0, 150)}
          </Text>
        </View>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: STATUS_COLORS[customer.status as CustomerStatus],
            },
          ]}
        >
          <View style={styles.badgeDot} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onStatusPress?.(customer.id)}
          >
            <Text style={styles.badgeText}>{statusText}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { borderColor: STATUS_COLORS[customer.status as CustomerStatus] },
          ]}
          onPress={handleCall}
        >
          <Ionicons name="call" size={18} color="#3B82F6" />
          <Text style={styles.actionText}>Ara</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
          <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
          <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleDetail}>
          <Ionicons name="document" size={18} color="#6366F1" />
          <Text style={styles.actionText}>Detay</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
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
