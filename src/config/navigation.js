import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Entypo } from '@expo/vector-icons';
import colors from '../styles/colors';
import HomeScreen from '../screens/HomeScreen';
import NotesScreen from '../screens/NotesScreen';
import CalendarScreen from '../screens/CalendarScreen';
import KarlaBold from '../assets/fonts/Karla-Bold.ttf';
import KarlaRegular from '../assets/fonts/Karla-Regular.ttf';
import BrandonBold from '../assets/fonts/BrandonGrotesque-Bold.ttf';
import BrandonRegular from '../assets/fonts/BrandonGrotesque-Regular.ttf';

export default function Navigation() {
  const [fontsLoaded] = useFonts({
    KarlaBold,
    KarlaRegular,
    BrandonBold,
    BrandonRegular,
  });

  const AppTabs = createBottomTabNavigator();
  const AppTabsScreen = () => (
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.secondary,
        labelStyle: {
          fontSize: 16,
          fontFamily: 'BrandonBold',
        },
        style: {},
      }}
    >
      <AppTabs.Screen
        name="Överblick"
        component={HomeScreen}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Entypo
              name="mask"
              color={color}
              size={26}
              activeTintColor="colors.primary"
            />
          ),
          fontFamily: 'BrandonBold',
        }}
      />
      <AppTabs.Screen
        name="Anteckningar"
        component={NotesScreen}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Entypo name="plus" color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('NotesModal');
          },
        })}
      />
      <AppTabs.Screen
        name="Kalender"
        component={CalendarScreen}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Entypo name="water" color={color} size={26} />
          ),
        }}
      />
    </AppTabs.Navigator>
  );

  const RootStack = createStackNavigator();
  const RootStackScreen = () => (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
      mode="modal"
    >
      <RootStack.Screen name="Main" component={AppTabsScreen} />
      <RootStack.Screen
        name="NotesModal"
        component={NotesScreen}
        options={{ animationEnabled: true }}
      />
    </RootStack.Navigator>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
