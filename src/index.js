import React, { Component } from 'react';
import AppNavigation from './config/Navigation/AppNavigation';
import AuthNavigation from './config/Navigation/AuthNavigation';
import { View, Text, StyleSheet } from 'react-native';
import colors from './styles/colors';
import * as firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return <View style={{ backgroundColor: '#F0C4BF' }} />;
    }

    if (!loggedIn) {
      return <AuthNavigation />;
    }

    return <AppNavigation />;
  }
}

export default App;
