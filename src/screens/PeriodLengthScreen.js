import React, { Component, useRef } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import PageControl from 'react-native-page-control';
import Range from '../components/Range';
import colors from '../styles/colors';
import typography from '../styles/typography';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
import { addDays } from 'date-fns';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
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

export default function PeriodLength({ navigation }) {
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

  const signInAnonymously = () => {
    const date = new Date();
    let today = date.toISOString();

    // Get values from local storage from previous screens
    let lastStartDate = ls.get('lastStartDate') || today;
    let periodLength = (ls.get('periodLength') && ls.get('periodLength')) || 5;
    let cycleLength = (ls.get('CycleLength') && ls.get('CycleLength')) || 28;

    // Determine a user's first recorded period by adding days equal to given period length, from last start date and forward
    let firstPeriod = [];
    for (let i = 0; i < periodLength; i++) {
      let date = addDays(new Date(lastStartDate), i);
      firstPeriod.push(date.toISOString().split('T')[0]);
    }

    // Estimate a user's next period
    let estimatedMenstrualDays = [];
    let nextPeriodStartDate = addDays(new Date(lastStartDate), cycleLength);
    ls.set('nextPeriodStartDate', nextPeriodStartDate);

    for (let i = 0; i < periodLength; i++) {
      let date = addDays(new Date(nextPeriodStartDate), i);
      estimatedMenstrualDays.push(date.toISOString().split('T')[0]);
    }

    // Sign in anonymously and write to database, navigate to main section of app with tab bar
    firebaseAuth
      .signInAnonymously()
      .then((result) => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            lastStartDate: lastStartDate.split('T')[0],
            periodLength: periodLength,
            cycleLength: cycleLength,
            periodDays: firstPeriod,
            estimatedMenstrualDays: estimatedMenstrualDays,
            nextPeriodStartDate: estimatedMenstrualDays[0],
            ongoingPeriod: false,
          });
      })
      .then(() => navigation.navigate('Main', { type: 'anonymous' }))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <PageControl
        numberOfPages={3}
        currentPage={2}
        hidesForSinglePage
        pageIndicatorTintColor={colors.primary}
        currentPageIndicatorTintColor={colors.white}
        indicatorStyle={{ borderRadius: 5 }}
        currentIndicatorStyle={{ borderRadius: 5 }}
        indicatorSize={{ width: width / 3 - 20, height: 5 }}
        style={{ marginTop: 20 }}
      />

      <View style={styles.container}>
        <Animatable.Text animation="fadeIn" delay={400} style={typography.h1}>
          Ange antal dagar du har mens
        </Animatable.Text>

        <Animatable.View animation="fadeIn" delay={1605}>
          <Range average={5} arrayLength={20} keyValue="periodLength" />
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
                signInAnonymously();
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
                  signInAnonymously();
                }, 700);
              }
            }}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}
