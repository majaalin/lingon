import React, { Component, useState, useEffect } from 'react';
import AppNavigation from './config/Navigation/AppNavigation';
import AuthNavigation from './config/Navigation/AuthNavigation';
import { View, Text, StyleSheet } from 'react-native';
import colors from './styles/colors';
import * as firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';

export default function App({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
    return () => (isSubscribed = false);
  }, []);

  if (!loaded) {
    return <View style={{ backgroundColor: '#F0C4BF' }} />;
  }

  if (!loggedIn) {
    return <AuthNavigation />;
  }

  return <AppNavigation />;
}
