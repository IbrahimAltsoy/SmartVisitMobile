import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface YCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onPress?: () => void | Promise<void>;
  style?: ViewStyle;
  content?: React.ReactNode;
}

const YCard: React.FC<YCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  style,
  content,
}) => {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      onPress={onPress}
      style={[styles.card, style]}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {content && <View style={styles.content}>{content}</View>}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  content: {
    marginTop: 12,
  },
});
export default YCard;
