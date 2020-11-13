import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import * as firebase from 'firebase';

export class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  // Play splash animation, then determine if user is logged in and navigate
  componentDidMount() {
    this.animation.play();

    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start(() => {});
  }

  render() {
    const { navigate } = this.props.navigation;
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setTimeout(() => {
          navigate('Start');
        }, 6000);
      } else {
        setTimeout(() => {
          navigate('Main');
        }, 6000);
      }
    });
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          source={require('../assets/lingon-splash.json')}
          autoPlay
          loop={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#F0C4BF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default SplashScreen;
