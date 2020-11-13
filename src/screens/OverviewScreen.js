import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import ButtonPrimary from '../components/ButtonPrimary';
import Header from '../components/Header';
import * as Animatable from 'react-native-animatable';
import firebaseAuth from '../config/keys';
import firebase from 'firebase';
const db = firebase.firestore();
import { addDays } from 'date-fns';
const ls = require('local-storage');
import moment from 'moment';
moment().format();

// Conversion of date formats
let date = new Date();
let today = date.toISOString().split('T')[0];
const month = date.toLocaleString('default', { month: 'long' });
let displayedDate = date.getDate() + ' ' + month + ' ' + date.getFullYear();
const currentDayOfPeriod = 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#7B6160',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

export default function Overview({ navigation }) {
  const [pressed, setPressed] = useState(false);
  const [periodDays, setPeriodDays] = useState([]);
  const [nextPeriodStartDate, setNextPeriodStartDate] = useState(0);
  const [ongoingPeriod, setOngoingPeriod] = useState(false);
  const [cycleLength, setCycleLength] = useState(false);
  const [periodLength, setPeriodLength] = useState(false);
  const [estimatedMenstrualDays, setEstimatedMenstrualDays] = useState(false);

  // Read data without reloading app
  useEffect(() => {
    let isSubscribed = true;
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          isSubscribed ? setOngoingPeriod(doc.data().ongoingPeriod) : true;
          isSubscribed ? setPressed(doc.data().ongoingPeriod) : true;
          isSubscribed
            ? setNextPeriodStartDate(doc.data().nextPeriodStartDate)
            : 'null';
          isSubscribed ? setPeriodDays(doc.data().periodDays) : null;
          isSubscribed ? setCycleLength(doc.data().cycleLength) : null;
          isSubscribed ? setPeriodLength(doc.data().periodLength) : null;
          isSubscribed
            ? setEstimatedMenstrualDays(doc.data().estimatedMenstrualDays)
            : null;
        }
      });
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (!periodDays.includes(today) && ongoingPeriod) {
      periodDays.push(today);
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          periodDays: periodDays,
        });
    }
    return () => (isSubscribed = false);
  }, []);

  // Start new period
  const addDates = () => {
    if (!periodDays.includes(today)) {
      periodDays.push(today);
      let lastStartDate = today;
      let nextDate = addDays(new Date(lastStartDate), cycleLength);
      let nextPeriodStartDate = nextDate.toISOString().split('T')[0];

      let estimatedMenstrualDays = [];

      for (let i = 0; i < periodLength; i++) {
        let date = addDays(new Date(nextPeriodStartDate), i);
        estimatedMenstrualDays.push(date.toISOString().split('T')[0]);
      }

      setPressed(true);
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          periodDays: periodDays,
          lastStartDate: lastStartDate,
          estimatedMenstrualDays: estimatedMenstrualDays,
          nextPeriodStartDate: nextPeriodStartDate,
          ongoingPeriod: true,
        });
    } else {
      setPressed(false);
      const periodDaysIndex = periodDays.indexOf(today);
      periodDays.splice(periodDaysIndex, 1);
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          ongoingPeriod: false,
          periodDays: periodDays,
        });
    }
  };

  const AnimationRef = useRef(null);

  const animation = () => {
    if (AnimationRef) {
      AnimationRef.current?.pulse();
    }
  };

  // Calculate countdown to next period
  const diff = moment(nextPeriodStartDate).diff(moment(today));
  let daysLeftBeforePeriodBegins = moment.duration(diff).days();

  if (daysLeftBeforePeriodBegins >= 2) {
    daysLeftBeforePeriodBegins = `${daysLeftBeforePeriodBegins} dagar kvar`;
  } else if (daysLeftBeforePeriodBegins === 1) {
    daysLeftBeforePeriodBegins = `${daysLeftBeforePeriodBegins} dag kvar`;
  } else if (daysLeftBeforePeriodBegins === 0) {
    daysLeftBeforePeriodBegins = 'Mensen är beräknad idag';
  } else if (daysLeftBeforePeriodBegins === -1) {
    daysLeftBeforePeriodBegins = `Mensen är ${Math.abs(
      daysLeftBeforePeriodBegins
    )} dag sen`;
  } else {
    daysLeftBeforePeriodBegins = `Mensen är ${Math.abs(
      daysLeftBeforePeriodBegins
    )} dagar sen`;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Överblick"
        icon="cog"
        onPress={() => navigation.navigate('SettingsModal')}
      />

      <Text style={[typography.h5, { marginTop: 50 }]}>{displayedDate}</Text>

      <Animatable.View ref={AnimationRef}>
        <Animatable.Text
          style={[typography.h1, { paddingLeft: 20, paddingRight: 20 }]}
          animation="fadeIn"
          delay={1000}
        >
          {pressed
            ? `Mensdag ${currentDayOfPeriod}`
            : daysLeftBeforePeriodBegins}
        </Animatable.Text>
      </Animatable.View>

      <View style={{ marginBottom: 150 }}>
        <ButtonPrimary
          title={pressed ? 'Mensen är slut' : 'Mensen har börjat'}
          onPress={() => {
            addDates();
            animation();
          }}
        />
      </View>

      <StatusBar barStyle="dark-content" />
    </View>
  );
}
