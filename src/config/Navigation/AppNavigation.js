import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import colors from '../../styles/colors';
import OverviewScreen from '../../screens/OverviewScreen';
import NotesScreen from '../../screens/NotesScreen';
import CalendarScreen from '../../screens/CalendarScreen';
import StartScreen from '../../screens/StartScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import SplashScreen from '../../screens/SplashScreen';
import KarlaBold from '../../assets/fonts/Karla-Bold.ttf';
import KarlaRegular from '../../assets/fonts/Karla-Regular.ttf';
import BrandonBold from '../../assets/fonts/BrandonGrotesque-Bold.ttf';
import BrandonRegular from '../../assets/fonts/BrandonGrotesque-Regular.ttf';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

// Navigation when logged in
export default function AppNavigation() {
  const [fontsLoaded] = useFonts({
    KarlaBold,
    KarlaRegular,
    BrandonBold,
    BrandonRegular,
  });

  const AnimationRef = useRef(null);

  const animation = () => {
    if (AnimationRef) {
      AnimationRef.current?.pulse();
    }
  };

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
        style: {
          height: 60,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          shadowColor: '#E92206',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
      }}
    >
      <AppTabs.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo
              name="mask"
              color={color}
              size={26}
              activeTintColor="colors.primary"
            />
          ),
          title: 'Överblick',
        }}
      />

      <AppTabs.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Animatable.View
              ref={AnimationRef}
              style={{
                width: 62,
                height: 62,
                borderRadius: 62 / 2,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
              }}
            >
              <Entypo name="plus" color={colors.white} size={26} />
            </Animatable.View>
          ),
          title: 'Anteckningar',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            animation();
            setTimeout(() => {
              navigation.navigate('NotesModal');
            }, 300);
          },
        })}
      />

      <AppTabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="water" color={color} size={26} />
          ),
          title: 'Kalender',
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
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <RootStack.Screen name="Main" component={AppTabsScreen} />

      <RootStack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name="Log in"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="NotesModal"
        component={NotesScreen}
        options={{ animationEnabled: true }}
      />
      <RootStack.Screen
        name="SettingsModal"
        component={SettingsScreen}
        options={{ animationEnabled: true }}
      />
    </RootStack.Navigator>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
