import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface ChartData {
  label: string;
  value: number;
  color?: string; // 👈 opsiyonel renk
}

interface YColumnChartProps {
  data: ChartData[];
  height?: number;
  style?: ViewStyle;
  barColor?: string;
  title?: string; // 👈 yeni prop
}

const YColumnChart: React.FC<YColumnChartProps> = ({
  data,
  height = 150,
  style,
  barColor = "#3B82F6",
  title = "Grafik Başlığı", // 👈 varsayılan başlık
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={[style, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Gösterilecek veri bulunamadı</Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor: item.color || barColor,
    topLabelComponent: () => (
      <Text style={{ fontSize: 12, color: "#374151", marginBottom: 6 }}>
        {item.value}
      </Text>
    ),
  }));

  return (
    <View
      style={[
        {
          padding: 16,
          backgroundColor: "#fff",
          borderRadius: 12,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 12,
          color: "#000",
        }}
      >
        {title}
      </Text>
      <BarChart
        data={chartData}
        barWidth={30}
        spacing={20}
        height={height}
        showLine={false}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
      />
    </View>
  );
};

export default YColumnChart;
