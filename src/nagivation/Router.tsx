import React, { useState, useEffect } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import SplashScreen from "../screens/welcome/SplashScreen";
import RootStack from "./RootStack";

const Router = () => {
  const [isLoading, setIsLoading] = useState(false); // Splash için
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Login durumu

  useEffect(() => {
    // Splash süresi simülasyonu (2 saniye sonra geçiş)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <RootStack /> : <AuthStack />;
};

export default Router;
