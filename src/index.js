import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import HomeScreen from './screens/HomeScreen';
import NotesScreen from './screens/NotesScreen';
import CalendarScreen from './screens/CalendarScreen';
import KarlaBold from './assets/fonts/Karla-Bold.ttf';
import KarlaRegular from './assets/fonts/Karla-Regular.ttf';
import BrandonBold from './assets/fonts/BrandonGrotesque-Bold.ttf';
import BrandonRegular from './assets/fonts/BrandonGrotesque-Regular.ttf';

export default function App() {
  const [fontsLoaded] = useFonts({
    KarlaBold,
    KarlaRegular,
    BrandonBold,
    BrandonRegular,
  });

  const Tab = createBottomTabNavigator();
  const RootStack = createStackNavigator();

  const NotesStackScreen = () => (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Överblick" component={HomeScreen} />
        <Tab.Screen name="Anteckningar" component={NotesStackScreen} />
        <Tab.Screen name="Kalender" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
