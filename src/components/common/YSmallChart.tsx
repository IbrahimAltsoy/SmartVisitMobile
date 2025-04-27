import React from "react";
import { View, Dimensions, ViewStyle } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

interface ChartData {
  label: string;
  value: number;
}

interface YSmallChartProps {
  data: ChartData[];
  height?: number;
  showLabels?: boolean;
  chartType?: "line" | "bar" | "pie"; // 👈 Yeni seçenek eklendi
  style?: ViewStyle;
}

const YSmallChart: React.FC<YSmallChartProps> = ({
  data,
  height = 120,
  showLabels = true,
  chartType = "line",
  style,
}) => {
  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#007bff",
    },
  };

  if (chartType === "pie") {
    return (
      <View style={style}>
        <PieChart
          data={data.map((d, index) => ({
            name: `${d.label} (${d.value})`,
            population: d.value,
            color: generateColor(index),
            legendFontColor: "#333",
            legendFontSize: 14,
          }))}
          width={Dimensions.get("window").width - 64}
          height={height}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={chartConfig}
        />
      </View>
    );
  }

  return (
    <View style={style}>
      {chartType === "line" ? (
        <LineChart
          data={{
            labels: showLabels ? labels : [],
            datasets: [{ data: values }],
          }}
          width={Dimensions.get("window").width - 64}
          height={height}
          chartConfig={chartConfig}
          bezier
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={showLabels}
          withHorizontalLabels={false}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
        />
      ) : (
        <BarChart
          data={{
            labels: showLabels ? labels : [],
            datasets: [{ data: values }],
          }}
          width={Dimensions.get("window").width - 64}
          height={height}
          chartConfig={chartConfig}
          withInnerLines={false}
          withVerticalLabels={showLabels}
          withHorizontalLabels={false}
          fromZero
          showValuesOnTopOfBars={true}
          yAxisLabel=""
          yAxisSuffix=""
        />
      )}
    </View>
  );
};

// Her pie slice için farklı renk üretiyoruz (basit yöntem)
const generateColor = (index: number) => {
  const colors = [
    "#5D5FEF",
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  return colors[index % colors.length];
};

export default YSmallChart;
