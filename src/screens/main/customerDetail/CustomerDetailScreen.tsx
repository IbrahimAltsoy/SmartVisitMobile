import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { CustomerService } from "../../../services/customer/CustomerService";
import { Customer } from "../../../types/customer/Customer";
import CustomerDetailCard from "../../../components/customers/CustomerDetailCard";
import { styles } from "./CustomerDetail.styles";
const CustomerDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await CustomerService.getById(id);
        setCustomer(data);
      } catch (error) {
        console.error("Müşteri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.centered}>
        <Text>Müşteri bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <CustomerDetailCard customer={customer} />
    </ScrollView>
  );
};

export default CustomerDetailScreen;
