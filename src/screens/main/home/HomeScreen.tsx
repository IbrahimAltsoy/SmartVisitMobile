import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { Alert, Button, TouchableOpacity, View } from "react-native";
import CustomerList from "../../../components/customers/CustomerList";
import { CustomerService } from "../../../services/customer/CustomerService";
import { Customer } from "../../../types/customer/Customer";
import { CustomerStatus } from "../../../types/enum/CustomerStatus";
import HomeHeader from "../../../components/home/HomeHeader";
import StatusUpdateModal from "../../../modals/customer/StatusUpdateModal";
import YButton from "../../../components/common/YButton";
import { TimePeriodType } from "../../../types/enum/TimePeriodType";

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

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  const loadingRef = useRef(false);

  const applyFilter = useCallback((data: Customer[], filter: FilterType) => {
    return filter === "all" ? data : data.filter((c) => c.status === filter);
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const summary = await CustomerService.getSummary(TimePeriodType.Daily);
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

  const [customerCounts, setCustomerCounts] = useState({
    byStatus: {
      [CustomerStatus.Delivered]: 0,
      [CustomerStatus.Waiting]: 0,
      [CustomerStatus.Canceled]: 0,
    },
  });

  const fetchCustomers = useCallback(
    async (pageNumber: number, isRefresh = false) => {
      if (loadingRef.current || (!isRefresh && !hasMore)) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        const response = await CustomerService.getAll(
          TimePeriodType.Daily,
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
    fetchSummary();
  }, [fetchCustomers, fetchSummary]);

  const handleLoadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) {
      fetchCustomers(page);
    }
  }, [page, hasMore, fetchCustomers]);

  const handleStatusPress = useCallback((id: string) => {
    setSelectedCustomerId(id);
    setStatusModalVisible(true);
  }, []);

  const handleStatusUpdate = async (newStatus: CustomerStatus) => {
    if (!selectedCustomerId) return;

    try {
      const response = await CustomerService.updateStatu({
        id: selectedCustomerId,
        status: newStatus,
      });

      if (response.success) {
        Alert.alert("Başarılı", response.message);

        // Müşteri listesini lokal olarak güncelle
        setCustomers((prevCustomers) => {
          const updated = prevCustomers.map((customer) =>
            customer.id === selectedCustomerId
              ? { ...customer, status: newStatus }
              : customer
          );
          setFilteredCustomers(applyFilter(updated, activeFilter));
          return updated;
        });

        // Gerekirse özet verisini de yenile
        fetchSummary();
      } else {
        Alert.alert("Hata", response.message);
      }
    } catch (error) {
      console.error("Durum güncelleme hatası:", error);
      Alert.alert("Hata", "Durum güncellenirken bir hata oluştu.");
    } finally {
      setStatusModalVisible(false);
      setSelectedCustomerId(null);
    }
  };

  const currentStatus = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId)?.status;
  }, [selectedCustomerId, customers]);

  useEffect(() => {
    fetchSummary();
    fetchCustomers(0);
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
        onStatusPress={handleStatusPress}
      />
      <View>
        <StatusUpdateModal
          visible={statusModalVisible}
          onClose={() => setStatusModalVisible(false)}
          onStatusSelect={handleStatusUpdate}
          currentStatus={currentStatus}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
