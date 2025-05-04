import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootStack";

const Router = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Router;
