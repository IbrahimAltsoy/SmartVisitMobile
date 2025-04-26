import React, { useState, useEffect, useContext } from "react";
import AuthStack from "./AuthStack";
import SplashScreen from "../screens/welcome/SplashScreen";
import RootStack from "./RootStack";
import AuthContext from "../context/AuthContext";

const Router = () => {
  const { isAuthenticated }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false); // Splash için

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
