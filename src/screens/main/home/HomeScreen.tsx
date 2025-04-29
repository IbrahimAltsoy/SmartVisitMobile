import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import { styles } from "./Home.styles";
import CustomerList from "../../../components/customers/CustomerList";
import YCard from "../../../components/common/YCard";
import YSmallChart from "../../../components/common/YSmallChart";
import YLoader from "../../../components/common/YLoader";
import { CustomerService } from "../../../services/customer/CustomerService";
import { Customer } from "../../../types/customer/Customer";

const COLORS = {
  primary: "#6366F1",
  secondary: "#3B82F6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
};

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [smsRemaining, setSmsRemaining] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const stats = [
    { id: 1, title: "Gelen", value: 27, color: COLORS.primary },
    { id: 2, title: "Biten", value: 21, color: COLORS.success },
    { id: 3, title: "Kalan", value: 6, color: COLORS.danger },
  ];

  // const fetchHomeData = async () => {
  //   setLoading(true);
  //   try {
  //     setCustomers([
  //       {
  //         id: 1,
  //         name: "Ali Yıldız",
  //         time: "09:00",
  //         status: "Bekliyor",
  //         phoneNumber: "+90 5375092791",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/men/1.jpg",
  //           "https://randomuser.me/api/portraits/men/2.jpg",
  //           "https://randomuser.me/api/portraits/men/3.jpg",
  //           "https://randomuser.me/api/portraits/men/4.jpg",
  //           "https://randomuser.me/api/portraits/men/1.jpg",
  //           "https://randomuser.me/api/portraits/men/1.jpg",
  //         ],
  //       },
  //       {
  //         id: 2,
  //         name: "Ayşe Demir",
  //         time: "09:30",
  //         status: "Teslim Edildi",
  //         phoneNumber: "+90 531 234 56 78",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/women/1.jpg",
  //           "https://randomuser.me/api/portraits/women/2.jpg",
  //         ],
  //       },
  //       {
  //         id: 3,
  //         name: "Mehmet Can",
  //         time: "10:00",
  //         status: "Bekliyor",
  //         phoneNumber: "+90 530 345 67 89",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/men/3.jpg",
  //           "https://randomuser.me/api/portraits/men/4.jpg",
  //         ],
  //       },
  //       {
  //         id: 4,
  //         name: "Zeynep Aydın",
  //         time: "10:30",
  //         status: "İptal",
  //         phoneNumber: "+90 539 456 78 90",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/women/3.jpg",
  //           "https://randomuser.me/api/portraits/women/4.jpg",
  //         ],
  //       },
  //       {
  //         id: 5,
  //         name: "Burak Çelik",
  //         time: "11:00",
  //         status: "Bekliyor",
  //         phoneNumber: "+90 538 567 89 01",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/men/5.jpg",
  //           "https://randomuser.me/api/portraits/men/6.jpg",
  //         ],
  //       },
  //       {
  //         id: 6,
  //         name: "Fatma Karaca",
  //         time: "11:30",
  //         status: "Teslim Edildi",
  //         phoneNumber: "+90 537 678 90 12",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/women/5.jpg",
  //           "https://randomuser.me/api/portraits/women/6.jpg",
  //         ],
  //       },
  //       {
  //         id: 7,
  //         name: "Can Yılmaz",
  //         time: "12:00",
  //         status: "Bekliyor",
  //         phoneNumber: "+90 536 789 01 23",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/men/7.jpg",
  //           "https://randomuser.me/api/portraits/men/8.jpg",
  //         ],
  //       },
  //       {
  //         id: 8,
  //         name: "Elif Özkan",
  //         time: "12:30",
  //         status: "İptal",
  //         phoneNumber: "+90 535 890 12 34",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/women/7.jpg",
  //           "https://randomuser.me/api/portraits/women/8.jpg",
  //         ],
  //       },
  //       {
  //         id: 9,
  //         name: "Murat Aslan",
  //         time: "13:00",
  //         status: "Bekliyor",
  //         phoneNumber: "+90 534 901 23 45",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/men/9.jpg",
  //           "https://randomuser.me/api/portraits/men/10.jpg",
  //         ],
  //       },
  //       {
  //         id: 10,
  //         name: "Sevil Güneş",
  //         time: "13:30",
  //         status: "Teslim Edildi",
  //         phoneNumber: "+90 535 012 34 56",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/women/9.jpg",
  //           "https://randomuser.me/api/portraits/women/10.jpg",
  //         ],
  //       },
  //       {
  //         id: 11,
  //         name: "Emre Kılıç",
  //         time: "14:00",
  //         status: "Bekliyor",
  //         phoneNumber: "+90 532 234 45 67",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/men/11.jpg",
  //           "https://randomuser.me/api/portraits/men/12.jpg",
  //         ],
  //       },
  //       {
  //         id: 12,
  //         name: "Selin Tekin",
  //         time: "14:30",
  //         status: "İptal",
  //         phoneNumber: "+90 531 345 56 78",
  //         productImages: [
  //           "https://randomuser.me/api/portraits/women/11.jpg",
  //           "https://randomuser.me/api/portraits/women/12.jpg",
  //         ],
  //       },
  //     ]);

  //     setSmsRemaining(120);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await CustomerService.getAll(1, 0, 12);
        setCustomers(data.items);
      } catch (error) {
        console.error("Müşteri verisi alınırken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <YLoader text="Veriler Yükleniyor..." />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Güzel işler seni bekliyor!</Text>
        <Text style={styles.subtitle}>Bereketli bir gün dileriz! 🌟</Text>
      </View>

      {/* Sayaç Kartları */}
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
          />
        ))}
      </View>

      {/* Müşteri Listesi */}
      <CustomerList customers={customers!} />

      {/* Haftalık Grafik */}
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
          chartType="pie"
          height={220}
        />
      </Animated.View>
    </View>
  );
};

export default HomeScreen;
