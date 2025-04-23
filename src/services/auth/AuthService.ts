// src/services/AuthService.ts

import apiClient from "../../utils/apiClient";
import * as SecureStore from "expo-secure-store";

class AuthService {
  private static ACCESS_TOKEN_KEY = "accessToken";

  // Giriş işlemi
  static async login(email: string, password: string) {
    try {
      const response = await apiClient.post("/auth/login", { email, password });

      const token = response.data.token;
      if (token) {
        await SecureStore.setItemAsync(this.ACCESS_TOKEN_KEY, token);
      }

      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data || error.message);
      throw error;
    }
  }

  // Kayıt işlemi
  static async register(payload: {
    email: string;
    password: string;
    name: string;
    phone: string;
  }) {
    try {
      const response = await apiClient.post("/auth/register", payload);
      return response.data;
    } catch (error: any) {
      console.error("Register failed:", error?.response?.data || error.message);
      throw error;
    }
  }

  // Oturumu sonlandır
  static async logout() {
    await SecureStore.deleteItemAsync(this.ACCESS_TOKEN_KEY);
    // istersen apiClient.post('/auth/logout') da çağırılabilir
  }

  // Tokenı manuel alman gerekirse
  static async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.ACCESS_TOKEN_KEY);
  }
}

export default AuthService;
