import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API_URL from "./baseUrl";

const apiClient = axios.create({
  baseURL: API_URL.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Her istekte SecureStore'dan token'ı alıp header'a ekler
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
