import React, { useCallback, useEffect, useState, useRef } from "react";
import { View } from "react-native";
import CustomerList from "../../../components/customers/CustomerList";
import { CustomerService } from "../../../services/customer/CustomerService";
import { Customer } from "../../../types/customer/Customer";
import { CustomerStatus } from "../../../types/enum/CustomerStatus";
import HomeHeader from "../../../components/home/HomeHeader";

const PAGE_SIZE = 5;
const TIME_PERIOD = 3;

type FilterType = "all" | CustomerStatus;

const HomeScreen = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [customerCounts, setCustomerCounts] = useState({
    byStatus: {
      [CustomerStatus.Delivered]: 0,
      [CustomerStatus.Waiting]: 0,
      [CustomerStatus.Canceled]: 0,
    },
  });
  const loadingRef = useRef(false);

  // Müşteri sayılarını hesapla
  const calculateCounts = useCallback((customers: Customer[]) => {
    const counts = {
      [CustomerStatus.Delivered]: 0,
      [CustomerStatus.Waiting]: 0,
      [CustomerStatus.Canceled]: 0,
    };

    customers.forEach((customer) => {
      if (customer.status || 0 in counts) {
        counts[customer.status as CustomerStatus]++;
      }
    });

    setCustomerCounts({
      byStatus: {
        [CustomerStatus.Delivered]: counts[CustomerStatus.Delivered],
        [CustomerStatus.Waiting]: counts[CustomerStatus.Waiting],
        [CustomerStatus.Canceled]: counts[CustomerStatus.Canceled],
      },
    });
  }, []);

  // Filtreleme fonksiyonu
  const applyFilter = useCallback(
    (customers: Customer[], filter: FilterType) => {
      return filter === "all"
        ? customers
        : customers.filter((customer) => customer.status === filter);
    },
    []
  );

  const fetchCustomers = useCallback(
    async (pageNumber: number, isRefresh = false) => {
      if (loadingRef.current || (!isRefresh && !hasMore)) return;

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
          const updatedCustomers = isRefresh
            ? newCustomers
            : [
                ...prev,
                ...newCustomers.filter((c) => !prev.some((p) => p.id === c.id)),
              ];

          // Filtrelenmiş listeyi güncelle
          setFilteredCustomers(applyFilter(updatedCustomers, activeFilter));
          // Sayıları hesapla
          calculateCounts(updatedCustomers);

          return updatedCustomers;
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
    [hasMore, activeFilter, applyFilter, calculateCounts]
  );

  // Filtre değiştiğinde
  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      setActiveFilter(filter);
      setFilteredCustomers(applyFilter(customers, filter));
    },
    [customers, applyFilter]
  );

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
      <HomeHeader
        activeFilter={activeFilter}
        counts={customerCounts}
        onSelect={handleFilterChange}
      />
      <CustomerList
        customers={filteredCustomers}
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