import React, { Component } from "react";
import Navigation from "./config/navigation";
import StartScreen from "./screens/StartScreen";
import HomeScreen from "./screens/HomeScreen";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { keys } from './config/keys';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhflAdWC_SfQNHc0Bfnfs50YXUxyxQJok",
  authDomain: "lingon-efa1f.firebaseapp.com",
  databaseURL: "https://lingon-efa1f.firebaseio.com",
  projectId: "lingon-efa1f",
  storageBucket: "lingon-efa1f.appspot.com",
  messagingSenderId: "1096786685361",
  appId: "1:1096786685361:web:34d7fbb8e5e0c73ebc2190",
  measurementId: "G-14SESQM186",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return <Navigation initialRouteName={StartScreen} />;
    }

    return <Navigation initialRouteName={HomeScreen} />;
  }
}

export default App;
