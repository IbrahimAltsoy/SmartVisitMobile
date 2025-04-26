import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface YListItemProps {
  title: string;
  subtitle?: string;
  status?: "Bekliyor" | "Teslim Edildi" | "İptal";
  icon?: React.ReactNode;
  onPress?: () => void | Promise<void>;
  style?: ViewStyle;
}

const YListItem: React.FC<YListItemProps> = ({
  title,
  subtitle,
  status,
  icon,
  onPress,
  style,
}) => {
  const ItemWrapper = onPress ? TouchableOpacity : View;

  return (
    <ItemWrapper
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {icon && <View style={styles.icon}>{icon}</View>}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {status && (
        <View style={[styles.badge, getStatusStyle(status)]}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      )}
    </ItemWrapper>
  );
};

const getStatusStyle = (status: YListItemProps["status"]) => {
  switch (status) {
    case "Bekliyor":
      return { backgroundColor: "#ffc107" };
    case "Teslim Edildi":
      return { backgroundColor: "#28a745" };
    case "İptal":
      return { backgroundColor: "#dc3545" };
    default:
      return { backgroundColor: "#6c757d" };
  }
};
export default YListItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
