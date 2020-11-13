import React, { Component, useState, useEffect } from 'react';
import AppNavigation from './config/Navigation/AppNavigation';
import AuthNavigation from './config/Navigation/AuthNavigation';
import { View, Text, LogBox } from 'react-native';
import * as firebase from 'firebase';

export default function App({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  LogBox.ignoreAllLogs();

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

  // Go to Start
  if (!loggedIn) {
    return <AuthNavigation />;
  }

  // Go to Overview
  return <AppNavigation />;
}
