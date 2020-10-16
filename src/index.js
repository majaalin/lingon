import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import NotesScreen from './screens/NotesScreen';
import CalendarScreen from './screens/CalendarScreen';
import KarlaBold from './assets/fonts/Karla-Bold.ttf';
import KarlaRegular from './assets/fonts/Karla-Regular.ttf';
import BrandonBold from './assets/fonts/BrandonGrotesque-Bold.ttf';
import BrandonRegular from './assets/fonts/BrandonGrotesque-Regular.ttf';
import colors from './styles/colors';

export default function App() {
  const [fontsLoaded] = useFonts({
    KarlaBold,
    KarlaRegular,
    BrandonBold,
    BrandonRegular,
  });

  const RootStack = createBottomTabNavigator();
  const MainStack = createStackNavigator();

  const ModalStack = () => (
    <MainStack.Navigator mode="modal">
      <MainStack.Screen
        name="Anteckningar"
        component={NotesScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator
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
        <RootStack.Screen
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
        <RootStack.Screen
          name="Anteckningar"
          component={ModalStack}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color }) => (
              <Entypo name="plus" color={color} size={26} />
            ),
          }}
        />
        <RootStack.Screen
          name="Kalender"
          component={CalendarScreen}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color }) => (
              <Entypo name="water" color={color} size={26} />
            ),
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
