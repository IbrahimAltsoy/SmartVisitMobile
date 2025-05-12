import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "./Customer.styles";
import { Ionicons } from "@expo/vector-icons";
import YColumnChart from "../../../components/common/YColumnChart";
import { CustomerService } from "../../../services/customer/CustomerService";
import { TimePeriodType } from "../../../types/enum/TimePeriodType";

const PeriodLabelToEnum: Record<string, TimePeriodType> = {
  Haftalık: TimePeriodType.Weekly,
  Aylık: TimePeriodType.Monthly,
  Yıllık: TimePeriodType.Yearly,
};

const FILTER_OPTIONS = ["Haftalık", "Aylık", "Yıllık"];
const { width } = Dimensions.get("window");

const CustomerScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Haftalık");

  const [stats, setStats] = useState([
    { label: "Toplam", value: 0, icon: "people", color: "#6750A4" },
    { label: "Yeni", value: 0, icon: "person-add", color: "#4CAF50" },
    { label: "Teslim", value: 0, icon: "checkmark-done", color: "#FFC107" },
    { label: "İptal", value: 0, icon: "close", color: "#F44336" },
  ]);

  const actions = [
    {
      label: "Müşteri Listesini Görüntüle",
      icon: "list",
      color: "#1976D2",
      handler: () => console.log("→ Listeleme ekranına git"),
    },
    {
      label: "Toplu SMS Gönder",
      icon: "chatbox-ellipses",
      color: "#388E3C",
      handler: () => console.log("→ Toplu SMS gönder ekranına git"),
    },
    {
      label: "Rapor Oluştur",
      icon: "document-text",
      color: "#5E35B1",
      handler: () => console.log("→ Rapor oluştur ekranına git"),
    },
  ];

  const visitTrendData = [
    { label: "Pzt", value: 10, color: "#6750A4" },
    { label: "Sal", value: 14, color: "#4CAF50" },
    { label: "Çar", value: 12, color: "#FFC107" },
    { label: "Per", value: 7, color: "#F44336" },
    { label: "Cum", value: 9, color: "#5E35B1" },
    { label: "Cts", value: 11, color: "#E91E63" },
    { label: "Paz", value: 6, color: "#1976D2" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const timePeriod = PeriodLabelToEnum[selectedPeriod];
        const summary = await CustomerService.getSummary(timePeriod);

        setStats([
          {
            label: "Toplam",
            value:
              (summary.Delivered ?? 0) +
              (summary.Waiting ?? 0) +
              (summary.Canceled ?? 0),
            icon: "people",
            color: "#6750A4",
          },
          {
            label: "Yeni",
            value: summary.Waiting ?? 0,
            icon: "person-add",
            color: "#4CAF50",
          },
          {
            label: "Teslim",
            value: summary.Delivered ?? 0,
            icon: "checkmark-done",
            color: "#FFC107",
          },
          {
            label: "İptal",
            value: summary.Canceled ?? 0,
            icon: "close",
            color: "#F44336",
          },
        ]);
      } catch (error) {
        console.error("Özet veriler alınamadı", error);
      }
    };

    fetchStats();
  }, [selectedPeriod]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>Müşteri Yönetimi</Text>
      </View>

      {/* Dönem Seçici */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.periodContainer}
      >
        {FILTER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.periodButton,
              selectedPeriod === option && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(option)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === option && styles.periodButtonTextActive,
              ]}
            >
              {option}
            </Text>
            {selectedPeriod === option && (
              <View style={styles.periodIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* İçerik */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* İstatistik Kartları */}
        <View style={styles.statsGrid}>
          {stats.map((stat: any, index) => (
            <View key={index} style={styles.statCard}>
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: `${stat.color}20` },
                ]}
              >
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statNumber}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Grafik */}
        <View style={styles.chartContainer}>
          <YColumnChart
            data={visitTrendData}
            height={180}
            barColor={styles.header.backgroundColor}
            title="Ziyaret Trendleri"
          />
        </View>

        {/* Hızlı İşlemler */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          {actions.map((action: any, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionButton,
                index === actions.length - 1 && styles.actionButtonLast,
              ]}
              onPress={action.handler}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: `${action.color}15` },
                ]}
              >
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={styles.actionText}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FAB Butonu */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log("→ Yeni müşteri ekle ekranına git")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomerScreen;
