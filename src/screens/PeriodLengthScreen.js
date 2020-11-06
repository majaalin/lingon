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
    paddingLeft: 20,
    paddingRight: 20,
    height: 540,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const width = Dimensions.get('window').width;

export default function PeriodLength() {
  const AnimationRef = useRef(null);

  const animation = () => {
    if (AnimationRef) {
      AnimationRef.current?.pulse();
    }
  };

  const signInAnonymously = () => {
    const date = new Date();
    let today = date.toISOString();
    let lastStartDate = ls.get('lastStartDate') || today;
    let periodLength = (ls.get('periodLength') && ls.get('periodLength')) || 5;
    let cycleLength = (ls.get('CycleLength') && ls.get('CycleLength')) || 28;

    let firstPeriod = [];

    for (let i = 0; i < periodLength; i++) {
      let date = addDays(new Date(lastStartDate), i);
      firstPeriod.push(date.toISOString().split('T')[0]);
    }

    let estimatedMenstrualDays = [];

    let nextPeriodStartDate = addDays(new Date(lastStartDate), cycleLength);

    ls.set('nextPeriodStartDate', nextPeriodStartDate);

    for (let i = 0; i < periodLength; i++) {
      let date = addDays(new Date(nextPeriodStartDate), i);
      estimatedMenstrualDays.push(date.toISOString().split('T')[0]);
    }

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
      .then(() => navigate('Main', { type: 'anonymous' }))
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
        <Animatable.Text
          animation="fadeInDown"
          delay={500}
          style={typography.h1}
        >
          Ange antal dagar du har mens
        </Animatable.Text>
        <Range average={5} arrayLength={20} keyValue="periodLength" />
      </View>

      <View style={{ bottom: 30, position: 'absolute' }}>
        <Animatable.View ref={AnimationRef}>
          <ButtonSecondary
            title="Fyll i senare"
            backgroundColor="secondary"
            font="buttonSecondary"
            onPress={() => {
              animation();
            }}
          />
        </Animatable.View>
        <Animatable.View ref={AnimationRef}>
          <ButtonPrimary
            title="Fortsätt"
            onPress={() => {
              {
                animation();
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
