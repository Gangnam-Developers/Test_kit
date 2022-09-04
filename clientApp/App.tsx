import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo } from "react";
import AuthenticateScreen from "./screens/gatekeeper/authentication_screen";
import HomeScreen from "./screens/home/home_screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  useMemo(async() => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token !== null) {
        setIsSignedIn(true)
      }
    } catch (error) {
      console.warn(error)
    }
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} logout={() => setIsSignedIn(false)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Authentication">
            {props => <AuthenticateScreen {...props} action={() => setIsSignedIn(true)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
