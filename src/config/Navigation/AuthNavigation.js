import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import StartScreen from '../../screens/StartScreen';
import OverviewScreen from '../../screens/OverviewScreen';
import LoginScreen from '../../screens/LoginScreen';
import LatestStartDateScreen from '../../screens/LatestStartDateScreen';
import CycleLengthScreen from '../../screens/CycleLengthScreen';
import PeriodLengthScreen from '../../screens/PeriodLengthScreen';
import SplashScreen from '../../screens/SplashScreen';
import KarlaBold from '../../assets/fonts/Karla-Bold.ttf';
import KarlaRegular from '../../assets/fonts/Karla-Regular.ttf';
import BrandonBold from '../../assets/fonts/BrandonGrotesque-Bold.ttf';
import BrandonRegular from '../../assets/fonts/BrandonGrotesque-Regular.ttf';

// Navigation when not logged in
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
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

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
        name="Main"
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

      <Stack.Screen
        name="PeriodLengthScreen"
        component={PeriodLengthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
