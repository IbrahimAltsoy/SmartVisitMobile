import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Ana Container
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  searchButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },

  // Period Tabs
  periodContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  periodButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  periodButtonActive: {
    backgroundColor: "#4F46E5",
  },
  periodButtonText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  periodButtonTextActive: {
    color: "#fff",
  },
  periodIndicator: {},

  // Content
  content: {
    padding: 12,
    paddingBottom: 100,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "20%",
    alignItems: "center", // ikon ve metni ortalar
    padding: 8,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  statIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: "#F3F4F6", // stat.color + "20" yapabilirsin istersen
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  statLabel: {
    fontSize: 12,
    color: "#374151", // soft koyu gri
    textAlign: "center",
    fontWeight: "500",
  },
  // Chart
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },

  // Actions
  actionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },

  // FAB
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});
