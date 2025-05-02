import React, { useCallback, useEffect, useState, useRef } from "react";
import { View } from "react-native";
import CustomerList from "../../../components/customers/CustomerList";
import { CustomerService } from "../../../services/customer/CustomerService";
import { Customer } from "../../../types/customer/Customer";
import { CustomerStatus } from "../../../types/enum/CustomerStatus";
import HomeHeader from "../../../components/home/HomeHeader";
import YColumnChart from "../../../components/common/YColumnChart";

const PAGE_SIZE = 5;
const TIME_PERIOD = 3;

type FilterType = "all" | CustomerStatus;

const HomeScreen = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [customerCounts, setCustomerCounts] = useState({
    byStatus: {
      [CustomerStatus.Delivered]: 0,
      [CustomerStatus.Waiting]: 0,
      [CustomerStatus.Canceled]: 0,
    },
  });

  const loadingRef = useRef(false);

  const applyFilter = useCallback((data: Customer[], filter: FilterType) => {
    return filter === "all" ? data : data.filter((c) => c.status === filter);
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const summary = await CustomerService.getSummary(TIME_PERIOD);

      setCustomerCounts({
        byStatus: {
          [CustomerStatus.Delivered]: summary.Delivered ?? 0,
          [CustomerStatus.Waiting]: summary.Waiting ?? 0,
          [CustomerStatus.Canceled]: summary.Canceled ?? 0,
        },
      });
    } catch (error) {
      console.error("Özet verisi alınamadı:", error);
    }
  }, []);

  // 📌 BURAYA KADAR

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
          const updated = isRefresh
            ? newCustomers
            : [
                ...prev,
                ...newCustomers.filter((c) => !prev.some((p) => p.id === c.id)),
              ];

          setFilteredCustomers(applyFilter(updated, activeFilter));
          return updated;
        });

        setHasMore(response.items.length === PAGE_SIZE);
        setPage(pageNumber + 1);
      } catch (err) {
        console.error("Veri alınamadı", err);
        setHasMore(false);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setRefreshing(false);
      }
    },
    [hasMore, activeFilter, applyFilter]
  );
  const visitTrendData = [
    { label: "Pzt", value: 10, color: "#6366F1" },
    { label: "Sal", value: 14, color: "#10B981" },
    { label: "Çar", value: 12, color: "#F59E0B" },
    { label: "Per", value: 7, color: "#EF4444" },
    { label: "Cum", value: 9, color: "#8B5CF6" },
    { label: "Cts", value: 11, color: "#EC4899" },
    { label: "Paz", value: 6, color: "#3B82F6" },
  ];

  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      setActiveFilter(filter);
      setFilteredCustomers(applyFilter(customers, filter));
    },
    [customers, applyFilter]
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setHasMore(true);
    setPage(0);
    fetchCustomers(0, true);
    fetchSummary(); // 🔁 refresh sırasında sayıları da güncelle
  }, [fetchCustomers, fetchSummary]);

  const handleLoadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) {
      fetchCustomers(page);
    }
  }, [page, hasMore, fetchCustomers]);

  useEffect(() => {
    fetchSummary(); // ✅ Sayılar burada yükleniyor
    fetchCustomers(0); // Müşteriler burada geliyor
  }, [fetchSummary, fetchCustomers]);

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
      <YColumnChart
        data={visitTrendData}
        height={150}
        barColor="#000"
        title="Günlük Gelen Müşteri Sayısı"
      />
    </View>
  );
};

export default HomeScreen;
