import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomerStatus } from "../../types/enum/CustomerStatus";

const { width } = Dimensions.get("window");

type FilterType = "all" | CustomerStatus;

interface HomeHeaderProps {
  activeFilter: FilterType;
  counts: {
    byStatus: { [key in CustomerStatus]?: number };
  };
  onSelect: (value: FilterType) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  activeFilter,
  counts,
  onSelect,
}) => {
  // Tüm durumların toplamını hesapla
  const totalCount = Object.values(counts.byStatus).reduce(
    (sum, count) => sum + (count || 0),
    0
  );

  // Buton genişliklerini dinamik hesapla
  const buttonWidth = (width - 40) / 4;

  const buttons = [
    {
      label: "Tüm",
      value: "all" as FilterType,
      count: totalCount,
      icon: "people" as const,
      activeColor: "#6366F1",
      inactiveColor: "#64748B",
    },
    {
      label: "Teslim",
      value: CustomerStatus.Delivered,
      count: counts.byStatus[CustomerStatus.Delivered] ?? 0,
      icon: "check-circle" as const,
      activeColor: "#10B981",
      inactiveColor: "#64748B",
    },
    {
      label: "Bekleme",
      value: CustomerStatus.Waiting,
      count: counts.byStatus[CustomerStatus.Waiting] ?? 0,
      icon: "hourglass-top" as const,
      activeColor: "#F59E0B",
      inactiveColor: "#64748B",
    },
    {
      label: "İptal",
      value: CustomerStatus.Canceled,
      count: counts.byStatus[CustomerStatus.Canceled] ?? 0,
      icon: "close" as const,
      activeColor: "#EF4444",
      inactiveColor: "#64748B",
    },
  ];

  const scaleAnimations = buttons.map(
    () => useRef(new Animated.Value(1)).current
  );

  const handlePressIn = (index: number) => {
    Animated.spring(scaleAnimations[index], {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scaleAnimations[index], {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <View style={styles.container}>
      {buttons.map((btn, index) => {
        const isActive = activeFilter === btn.value;

        return (
          <Animated.View
            key={btn.value}
            style={[
              styles.buttonContainer,
              {
                transform: [{ scale: scaleAnimations[index] }],
                width: buttonWidth,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => onSelect(btn.value)}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              activeOpacity={0.85}
              style={[
                styles.button,
                {
                  backgroundColor: isActive ? btn.activeColor : "#F8FAFC",
                  borderColor: isActive ? btn.activeColor : "#E2E8F0",
                },
              ]}
            >
              <MaterialIcons
                name={btn.icon}
                size={14}
                color={isActive ? "#FFF" : btn.inactiveColor}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive ? "#FFF" : btn.inactiveColor,
                    fontSize: btn.label.length > 5 ? 12 : 13,
                  },
                ]}
                numberOfLines={1}
              >
                {btn.label}
              </Text>
              <View
                style={[
                  styles.counter,
                  {
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.2)"
                      : "#EDF2F7",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.counterText,
                    { color: isActive ? "#FFF" : "#475569" },
                  ]}
                >
                  {btn.count}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

// Stil tanımları aynı kalacak
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  buttonContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: "600",
    marginRight: 4,
    maxWidth: "60%",
  },
  counter: {
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontWeight: "700",
    fontSize: 11,
    includeFontPadding: false,
  },
});

export default HomeHeader;
