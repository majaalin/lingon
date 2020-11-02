import React, { Component } from 'react';
import AppNavigation from './config/Navigation/AppNavigation';
import AuthNavigation from './config/Navigation/AuthNavigation';
import { View, Text } from 'react-native';
import colors from './styles/colors';
import * as firebase from 'firebase';

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
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondary,
            textColor: colors.primary,
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return <AuthNavigation />;
    }
    // if user starting date, period length, cycle length exists in database, go to home screen. else go to start screen next time user opens app
    return <AppNavigation />;
  }
}

export default App;
