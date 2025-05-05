import React, { useState } from "react";
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

const FILTER_OPTIONS = ["Haftalık", "Aylık", "Yıllık"];
const { width } = Dimensions.get("window");

const CustomerScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Haftalık");

  const stats = [
    { label: "Toplam", value: 124, icon: "people", color: "#6366F1" },
    { label: "Yeni", value: 37, icon: "person-add", color: "#10B981" },
    { label: "Teslim", value: 60, icon: "checkmark-done", color: "#F59E0B" },
    { label: "İptal", value: 6, icon: "close", color: "#EF4444" },
  ];

  const actions = [
    {
      label: "Müşteri Listesini Görüntüle",
      icon: "list",
      color: "#3B82F6",
      handler: () => console.log("→ Listeleme ekranına git"),
    },
    {
      label: "Toplu SMS Gönder",
      icon: "chatbox-ellipses",
      color: "#10B981",
      handler: () => console.log("→ Toplu SMS gönder ekranına git"),
    },
    {
      label: "Rapor Oluştur",
      icon: "document-text",
      color: "#8B5CF6",
      handler: () => console.log("→ Rapor oluştur ekranına git"),
    },
  ];

  const visitTrendData = [
    { label: "Pzt", value: 10, color: "#6366F1" },
    { label: "Sal", value: 14, color: "#10B981" },
    { label: "Çar", value: 12, color: "#F59E0B" },
    { label: "Per", value: 7, color: "#EF4444" },
    { label: "Cum", value: 9, color: "#8B5CF6" },
    { label: "Cts", value: 11, color: "#EC4899" },
    { label: "Paz", value: 6, color: "#3B82F6" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Başlık ve Arama */}
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
            <Text style={styles.periodButtonText}>{option}</Text>
            {selectedPeriod === option && (
              <View style={styles.periodIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* İstatistik Kartları */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[
                styles.statCard,
                { backgroundColor: `${stat.color}40` }, // %15 opacity
              ]}
            >
              <View style={styles.statIconContainer}>
                <Ionicons name="accessibility" size={18} color={stat.color} />
              </View>
              <Text style={[styles.statNumber, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Grafik */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Ziyaret Trendleri</Text>
          <YColumnChart data={visitTrendData} height={200} barColor="#6366F1" />
        </View>

        {/* Aksiyon Butonları */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={action.handler}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: action.color + "20" },
                ]}
              >
                <Ionicons
                  name="accessibility-outline"
                  size={20}
                  color={action.color}
                />
              </View>
              <Text style={styles.actionText}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FAB Butonu */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log("→ Yeni müşteri ekle ekranına git")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomerScreen;
