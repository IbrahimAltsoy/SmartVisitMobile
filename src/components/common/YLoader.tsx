import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface YLoaderProps {
  size?: "small" | "large";
  color?: string;
  text?: string;
  style?: ViewStyle;
}

const YLoader: React.FC<YLoaderProps> = ({
  size = "large",
  color = "#007bff",
  text,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};
export default YLoader;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});
