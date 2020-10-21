import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import StartScreen from "../../screens/StartScreen";
import OverviewScreen from "../../screens/OverviewScreen";
import LoginScreen from "../../screens/LoginScreen";
import LatestStartDateScreen from "../../screens/LatestStartDateScreen";
import CycleLengthScreen from "../../screens/CycleLengthScreen";
import KarlaBold from "../../assets/fonts/Karla-Bold.ttf";
import KarlaRegular from "../../assets/fonts/Karla-Regular.ttf";
import BrandonBold from "../../assets/fonts/BrandonGrotesque-Bold.ttf";
import BrandonRegular from "../../assets/fonts/BrandonGrotesque-Regular.ttf";

export default function AuthNavigation() {
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
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Overview"
        component={OverviewScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LatestStartDate"
        component={LatestStartDateScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CycleLengthScreen"
        component={CycleLengthScreen}
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
