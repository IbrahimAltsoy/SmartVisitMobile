import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import CustomerCard from "./CustomerCard";
import CustomerDetailCard from "./CustomerDetailCard";
import { Customer } from "../../types/customer/Customer"; // Doğru tip olduğunu varsayıyoruz

interface CustomerListProps {
  customers: Customer[];
}

const screenHeight = Dimensions.get("window").height;

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.nameSurname.toLowerCase().includes(query) ||
          customer.phone.toLowerCase().includes(query)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  if (customers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Bugün gelen müşteri bulunamadı.</Text>
      </View>
    );
  }

  // Eğer detay görünümdeysek
  if (selectedCustomerId !== null) {
    const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
    if (selectedCustomer) {
      return (
        <View style={styles.detailContainer}>
          <CustomerDetailCard customer={selectedCustomer} />
          <Text
            style={styles.backButton}
            onPress={() => setSelectedCustomerId(null)}
          >
            ← Geri Dön
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={{ height: screenHeight * 0.5 }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Müşteri adı veya telefon ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor="#94a3b8"
      />

      {/* FlatList */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <CustomerCard
            customer={item}
            index={index}
            onDetailPress={(id) => setSelectedCustomerId(id)}
          />
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
  },
  detailContainer: {
    padding: 12,
  },
  backButton: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "500",
  },
});

export default CustomerList;
