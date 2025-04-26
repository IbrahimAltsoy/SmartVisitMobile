import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/auth/AuthService";
import { LoginCommand } from "../types/auth/login/LoginCommand";
import { LoggedResponse } from "../types/auth/login/LoggedResponse";
import { Alert } from "react-native";

// AuthContext'i TypeScript'e uygun şekilde tanımlıyoruz
interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (loginData: LoginCommand) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (loginData: LoginCommand) => {
    try {
      const response: LoggedResponse = await authService.login(loginData);
      if (response.accessToken && response.accessToken.token) {
        setUser(response.user.name);
        setIsAuthenticated(true);
      } else {
        Alert.alert("Giriş hatası", "Email ve ya sifre yanlış");
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      Alert.alert("Giriş hatası", error.message);
      setIsAuthenticated(false);
    }
  };
  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
