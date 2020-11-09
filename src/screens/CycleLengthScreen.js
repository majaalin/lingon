import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import PageControl from 'react-native-page-control';
import Range from '../components/Range';
import colors from '../styles/colors';
import typography from '../styles/typography';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import * as Animatable from 'react-native-animatable';
const ls = require('local-storage');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  container: {
    height: 540,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const width = Dimensions.get('window').width;

export default function CycleLength({ navigation }) {
  const AnimationRefPrimary = useRef(null);
  const AnimationRefSecondary = useRef(null);

  const animationSecondary = () => {
    if (AnimationRefSecondary) {
      AnimationRefSecondary.current?.pulse();
    }
  };

  const animationPrimary = () => {
    if (AnimationRefPrimary) {
      AnimationRefPrimary.current?.pulse();
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Animatable.View animation="fadeIn" delay={100}>
          <PageControl
            numberOfPages={3}
            currentPage={1}
            hidesForSinglePage
            pageIndicatorTintColor={colors.primary}
            currentPageIndicatorTintColor={colors.white}
            indicatorStyle={{ borderRadius: 5 }}
            currentIndicatorStyle={{ borderRadius: 5 }}
            indicatorSize={{ width: width / 3 - 20, height: 5 }}
            style={{ marginTop: 20 }}
          />
        </Animatable.View>
      </View>
      <View style={styles.container}>
        <Animatable.Text animation="fadeIn" delay={400} style={typography.h1}>
          Ange längd på din menscykel
        </Animatable.Text>
        <Animatable.View animation="fadeIn" delay={1605}>
          <Range average={28} arrayLength={40} keyValue="CycleLength" />
        </Animatable.View>
      </View>

      <View style={{ bottom: 30, position: 'absolute' }}>
        <Animatable.View
          ref={AnimationRefSecondary}
          animation="fadeIn"
          delay={100}
        >
          <ButtonSecondary
            title="Fyll i senare"
            backgroundColor="secondary"
            font="buttonSecondary"
            onPress={() => {
              animationSecondary();
              setTimeout(() => {
                navigation.navigate('PeriodLengthScreen');
              }, 700);
            }}
          />
        </Animatable.View>
        <Animatable.View
          ref={AnimationRefPrimary}
          animation="fadeIn"
          delay={100}
        >
          <ButtonPrimary
            title="Fortsätt"
            onPress={() => {
              {
                animationPrimary();
                setTimeout(() => {
                  navigation.navigate('PeriodLengthScreen');
                }, 700);
              }
            }}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}
