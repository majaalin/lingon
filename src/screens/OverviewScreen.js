import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import Button from '../components/Button';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
import Header from '../components/Header';
import { addDays } from 'date-fns';
const db = firebase.firestore();
const ls = require('local-storage');

let date = new Date();
let today = date.toISOString().split('T')[0];
today = '2020-11-25';
const month = date.toLocaleString('default', { month: 'long' });
let displayedDate = date.getDate() + ' ' + month + ' ' + date.getFullYear();
const daysLeftBeforePeriodBegins = 3;
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
  },
});

export default function Overview({ navigation }) {
  const [pressed, setPressed] = useState(false);
  const [periodDays, setPeriodDays] = useState(['null']);

  if (periodDays.includes('null')) {
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setPeriodDays(doc.data().periodDays);
          return;
        }
      });
  }

  const addDates = () => {
    if (!pressed) {
      if (!periodDays.includes(today)) {
        periodDays.push(today);
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .update({
            periodDays: periodDays,
          });
      }
      setPressed(true);
    } else {
      setPressed(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Överblick"
        icon="cog"
        onPress={() => navigation.navigate('SettingsModal')}
      />
      <Text style={[typography.h5, { marginTop: 50 }]}>{displayedDate}</Text>
      <Text style={typography.h1}>
        {pressed
          ? `Dag ${currentDayOfPeriod}`
          : `${daysLeftBeforePeriodBegins} dagar kvar`}
      </Text>
      <View style={{ bottom: 50 }}>
        <Button
          title={pressed ? 'Mensen är slut' : 'Mensen har börjat'}
          onPress={() => {
            addDates();
          }}
        />
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
