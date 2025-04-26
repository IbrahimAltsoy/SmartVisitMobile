// src/services/AuthService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoggedResponse } from "../../types/auth/login/LoggedResponse";
import { LoginCommand } from "../../types/auth/login/LoginCommand";
import apiClient from "../../utils/apiClient";
import * as SecureStore from "expo-secure-store";

const authService = {
  login: async (data: LoginCommand): Promise<LoggedResponse> => {
    try {
      const response = await apiClient.post<LoggedResponse>(
        "/auth/login",
        data
      );

      // Token'ı sakla
      if (response.data && response.data.accessToken) {
        await SecureStore.setItemAsync(
          "accessToken",
          response.data.accessToken.token
        );
      }
      //console.log(response.data.accessToken.token);
      return response.data;
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error?.response?.data?.message || "Giriş yapılamadı.");
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    console.log("Çıkış yapıldı");
  },
};
export default authService;