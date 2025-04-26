import { styles } from "./Home.styles";

import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import YCard from "../../../components/common/YCard";
import YListItem from "../../../components/common/YListItem";
import YButton from "../../../components/common/YButton";
import YLoader from "../../../components/common/YLoader";
import YSmallChart from "../../../components/common/YSmallChart";
const COLORS = {
  primary: "#6366F1", // Mor
  secondary: "#3B82F6", // Mavi
  success: "#10B981", // Yeşil
  warning: "#F59E0B", // Sarı
  danger: "#EF4444", // Kırmızı
  background: "#F8FAFC", // Arkaplan
  textPrimary: "#1E293B", // Başlık
  textSecondary: "#64748B", // Alt metin
  cardBackground: "#FFFFFF", // Kartlar
};
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [smsRemaining, setSmsRemaining] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["Pzt", "Salı", "Çrş", "Prş", "Cuma", "Cts", "Pzr"],
    datasets: [
      {
        data: [8, 5, 10, 4, 12, 6, 2],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(93, 95, 239, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    barPercentage: 0.5,
  };
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return <YLoader text="Veriler Yükleniyor..." />;
  }
  interface Customer {
    id: number;
    name: string;
    time: string;
    status: "Bekliyor" | "Teslim Edildi" | "İptal";
  }
  const stats = [
    { id: 1, title: "Gelen", value: 27, color: COLORS.primary },
    { id: 2, title: "Biten", value: 21, color: COLORS.success },
    { id: 3, title: "Kalan", value: 6, color: COLORS.danger },
  ];
  const fetchHomeData = async () => {
    setLoading(true);
    try {
      // API'den müşteri ve SMS verilerini çek
      // Şimdilik sahte veri koyalım
      setCustomers([
        { id: 1, name: "Ali Veli", time: "14:00", status: "Bekliyor" },
        { id: 2, name: "Ayşe Yılmaz", time: "15:30", status: "Teslim Edildi" },
        { id: 3, name: "Mehmet Can", time: "16:45", status: "İptal" },
      ]);
      setSmsRemaining(120);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) {
    return <YLoader text="Veriler Yükleniyor..." />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchHomeData} />
      }
    >
      {/* Hoşgeldin Mesajı */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Hoşgeldin ibo!</Text>
        <Text style={styles.subtitle}>Bugün harika işler başaracaksın 🚀</Text>
      </View>

      {/* Sayaç Kartları */}
      {/* <View style={styles.cardsRow}>
        <YCard title="Bugün Gelenler" subtitle="3" />
        <YCard title="Kalan SMS" subtitle={smsRemaining.toString()} />
      </View> */}
      <Text style={styles.subtitle}>
        {new Date().toLocaleDateString("tr-TR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </Text>
      <View style={styles.cardsRow}>
        {stats.map((stat) => (
          <YCard
            key={stat.id}
            title={stat.title}
            subtitle={stat.value.toString()}
            style={{
              flex: 1,
              backgroundColor: `${stat.color}20`,
              borderLeftWidth: 4,
              borderLeftColor: stat.color,
            }}
            onPress={() => {}}
          />
        ))}
      </View>

      {/* Günlük Grafik */}
      {/* Grafik Kartı */}
      <Animated.View
        style={[
          styles.graphCard,
          {
            opacity: animation,
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.sectionTitle}>Haftalık Gelen Müşteri</Text>
        <YSmallChart
          data={[
            { label: "Pzt", value: 8 },
            { label: "Salı", value: 5 },
            { label: "Çrş", value: 10 },
            { label: "Prş", value: 4 },
            { label: "Cuma", value: 12 },
            { label: "Cts", value: 6 },
            { label: "Pazar", value: 2 },
          ]}
          chartType="pie" // 👈 pie chart kullanıyoruz!
          height={220}
        />
      </Animated.View>

      {/* Son Gelenler */}
      <View style={styles.listContainer}>
        {customers.map((customer) => (
          <YListItem
            key={customer.id}
            title={customer.name}
            subtitle={customer.time}
            status={customer.status}
          />
        ))}
      </View>

      {/* Hızlı Aksiyonlar */}
      <View style={styles.actions}>
        <YButton
          title="Müşteri Listesi"
          onPress={() => {}}
          style={{ backgroundColor: "grey" }}
        />
        <YButton title="Yeni SMS Gönder" onPress={() => {}} />
        <YButton title="Raporları Gör" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
