import React, { useCallback, useEffect, useState, useRef } from "react";
import { View } from "react-native";
import CustomerList from "../../../components/customers/CustomerList";
import { CustomerService } from "../../../services/customer/CustomerService";
import { Customer } from "../../../types/customer/Customer";

const PAGE_SIZE = 2;
const TIME_PERIOD = 3;

const HomeScreen = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false); // Ref kullanarak gerçek zamanlı loading durumu

  const fetchCustomers = useCallback(
    async (pageNumber: number, isRefresh = false) => {
      // Çift çağrıları önlemek için ref kontrolü
      if (loadingRef.current || (!isRefresh && !hasMore)) return;

      console.log(`Fetching page ${pageNumber}...`);
      loadingRef.current = true;
      setLoading(true);

      try {
        const response = await CustomerService.getAll(
          TIME_PERIOD,
          pageNumber,
          PAGE_SIZE
        );

        const newCustomers = response.items.map((item: any) => ({
          ...item,
          productName: item.productName ?? "",
          description: item.description ?? "",
          createdDate: item.createdDate ?? new Date(),
          photoUrls: item.photoUrls ?? [],
          pointed: item.pointed ?? false,
        }));

        setCustomers((prev) => {
          if (isRefresh) return newCustomers;

          // Tekrar eden verileri önle
          const existingIds = new Set(prev.map((c) => c.id));
          const uniqueNew = newCustomers.filter((c) => !existingIds.has(c.id));
          return [...prev, ...uniqueNew];
        });

        setHasMore(response.items.length === PAGE_SIZE);
        setPage(pageNumber + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasMore(false);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setRefreshing(false);
      }
    },
    [hasMore]
  );

  // Debounce eklenmiş loadMore fonksiyonu
  const handleLoadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) {
      fetchCustomers(page);
    }
  }, [page, hasMore, fetchCustomers]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setHasMore(true);
    setPage(0);
    fetchCustomers(0, true);
  }, [fetchCustomers]);

  useEffect(() => {
    fetchCustomers(0);
  }, [fetchCustomers]);

  return (
    <View style={{ flex: 1 }}>
      <CustomerList
        customers={customers}
        loading={loading}
        refreshing={refreshing}
        hasMore={hasMore}
        onEndReached={handleLoadMore}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default HomeScreen;
