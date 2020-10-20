import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import StartScreen from "../../screens/StartScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import LoginScreen from "../../screens/LoginScreen";
import KarlaBold from "../../assets/fonts/Karla-Bold.ttf";
import KarlaRegular from "../../assets/fonts/Karla-Regular.ttf";
import BrandonBold from "../../assets/fonts/BrandonGrotesque-Bold.ttf";
import BrandonRegular from "../../assets/fonts/BrandonGrotesque-Regular.ttf";

export default function AppNavigation() {
  const [fontsLoaded] = useFonts({
    KarlaBold,
    KarlaRegular,
    BrandonBold,
    BrandonRegular,
  });

  const Stack = createStackNavigator();

  const StackScreen = () => (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Log in"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
