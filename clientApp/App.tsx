import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthenticateScreen from "./screens/gatekeeper/authentication_screen";
import HomeScreen from "./screens/home/home_screen";

const Stack = createNativeStackNavigator()

export default function App() {
  
  const [isSignedIn, setIsSignedIn] = React.useState(true);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSignedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ): (<Stack.Screen name="Authentication" component={AuthenticateScreen} />)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
