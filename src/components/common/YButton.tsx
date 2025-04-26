import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface YButtonProps {
  title?: string;
  onPress?: () => void | Promise<void>;
  icon?: React.ReactNode;
  variant?: "filled" | "outline";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const YButton: React.FC<YButtonProps> = ({
  title,
  onPress,
  icon,
  variant = "filled",
  disabled = false,
  loading = false,
  style,
}) => {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isOutline ? styles.outline : styles.filled,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? "#007bff" : "#fff"} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[
              styles.text,
              isOutline ? styles.textOutline : styles.textFilled,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default YButton;
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  filled: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#007bff",
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textFilled: {
    color: "#fff",
  },
  textOutline: {
    color: "#007bff",
  },
});
