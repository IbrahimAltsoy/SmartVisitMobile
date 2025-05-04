import React, { useMemo, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomerCard from "./CustomerCard";
import { Customer } from "../../types/customer/Customer";

interface CustomerListProps {
  customers: Customer[];
  loading: boolean;
  hasMore: boolean;
  refreshing: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  initialLoad?: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  loading,
  hasMore,
  refreshing,
  onEndReached,
  onRefresh,
  initialLoad = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<any>();

  const filteredCustomers = useMemo(() => {
    if (searchQuery.trim() === "") return customers;

    const query = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.nameSurname.toLowerCase().includes(query) ||
        c.phone.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  const handleDetailPress = (id: string) => {
    navigation.navigate("CustomerDetail", { id: id });
  };

  if (initialLoad) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (customers.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Bugün gelen müşteri bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Müşteri adı veya telefon ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor="#94a3b8"
      />

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CustomerCard
            customer={item}
            index={index}
            onDetailPress={handleDetailPress}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading ? (
            <View style={styles.footer}>
              <ActivityIndicator
                size="small"
                color="#3B82F6"
                style={{ marginVertical: 16 }}
              />
              <Text style={styles.footerText}>Veriler yükleniyor...</Text>
            </View>
          ) : !hasMore ? (
            <View style={styles.footer}>
              <Text style={styles.footerText}>Tüm müşteriler yüklendi ✅</Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#1e293b",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  footerText: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
  },
  listContent: {
    paddingBottom: 30,
  },
});

export default CustomerList;
