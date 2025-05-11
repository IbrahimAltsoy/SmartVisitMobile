import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomerStatus } from "../../types/enum/CustomerStatus";

interface StatusUpdateModalProps {
  visible: boolean;
  onClose: () => void;
  onStatusSelect: (status: CustomerStatus) => void;
  currentStatus?: CustomerStatus;
}

const STATUS_LABELS: Record<CustomerStatus, string> = {
  [CustomerStatus.Waiting]: "Bekliyor",
  [CustomerStatus.Delivered]: "Teslim Edildi",
  [CustomerStatus.Canceled]: "İptal Edildi",
};

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  visible,
  onClose,
  onStatusSelect,
  currentStatus,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Durumu Güncelle</Text>

          {Object.entries(STATUS_LABELS).map(([key, label]) => {
            const status = Number(key) as CustomerStatus;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  onStatusSelect(status);
                  onClose();
                }}
                style={[
                  styles.option,
                  currentStatus === status && styles.activeOption,
                ]}
              >
                <Text style={styles.optionText}>{label}</Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  option: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  activeOption: {
    backgroundColor: "#F3F4F6",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default StatusUpdateModal;
