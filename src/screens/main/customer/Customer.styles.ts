import { StyleSheet } from "react-native";

const primaryColor = "#6750A4"; // Daha modern bir mor tonu
const secondaryColor = "#4A3F6B"; // Daha koyu bir varyant
const backgroundColor = "#F3EDF7"; // Açık, yumuşak bir arka plan
const cardBackgroundColor = "#FFFFFF";
const textColorPrimary = "#212121"; // Koyu gri
const textColorSecondary = "#757575"; // Açık gri
const accentColor = "#00897B"; // Canlı bir vurgu rengi

export const styles = StyleSheet.create({
  // Ana Container
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: cardBackgroundColor,
    borderBottomWidth: 0, // Kenarlık kaldırıldı
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android için gölge
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: textColorPrimary,
  },
  searchButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },

  // Period Tabs
  periodContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: cardBackgroundColor,
    height: 60,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
  },
  periodButtonActive: {
    backgroundColor: accentColor,
  },
  periodButtonText: {
    fontSize: 14,
    color: "#000s",
    fontWeight: "bold",
  },
  periodButtonTextActive: {
    color: cardBackgroundColor,
  },
  periodIndicator: {
    // İstenirse aktif butonun altında küçük bir çizgi eklenebilir
  },

  // Content
  content: {
    padding: 16,
    paddingBottom: 120,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%", // Daha geniş kartlar
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: cardBackgroundColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  statIconContainer: {
    position: "absolute", // 🔑
    top: 10,
    left: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // veya stat.color + "20"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: textColorPrimary,
    textAlign: "center",
  },

  statLabel: {
    fontSize: 13,
    color: textColorSecondary,
    textAlign: "center",
    fontWeight: "medium",
  },
  // Chart
  chartContainer: {
    backgroundColor: cardBackgroundColor,
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "semibold",
    color: textColorPrimary,
    marginBottom: 10,
  },

  // Actions
  actionsContainer: {
    backgroundColor: cardBackgroundColor,
    borderRadius: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  actionButtonLast: {
    borderBottomWidth: 0, // Son butonun alt çizgisi yok
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 15,
    color: textColorPrimary,
  },

  // FAB
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});