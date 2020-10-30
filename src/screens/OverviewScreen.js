import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import Button from '../components/Button';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';

const db = firebase.firestore();

const ls = require('local-storage');

let date = new Date();
let today = date.toISOString().split('T')[0];
const month = date.toLocaleString('default', { month: 'long' });
let displayedDate = date.getDate() + ' ' + month + ' ' + date.getFullYear();

let periodDay =
  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

let testArray = ['2020-10-20', '2020-10-21', '2020-10-22'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Overview({ navigation }) {
  const [cycleLength, setCycleLength] = useState(0);
  const [lastStartDate, setLastStartDate] = useState(0);
  const [periodLength, setPeriodLength] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState([]);

  const addDates = () => {
    if (!currentPeriod.includes(today)) {
      currentPeriod.push(today);
    }

    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.exists && !currentPeriod.exists) {
          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
              currentPeriod: currentPeriod,
            });
          console.log(currentPeriod);
          return;
        } else {
          setCurrentPeriod([]);
        }
      });
  };

  db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setCycleLength(doc.data().cycleLength);
        setLastStartDate(doc.data().lastStartDate);
        setPeriodLength(doc.data().periodLength);
        return;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

  const togglePressed = () => setPressed(!pressed);

  return (
    <View style={styles.container}>
      <Text>Senaste mensstart: {lastStartDate}</Text>
      <Text>Antal mensdagar: {periodLength}</Text>
      <Text>Menslängd: {cycleLength}</Text>
      <Text style={typography.h5}>{displayedDate}</Text>
      <Text
        style={typography.h1}
        onPress={() => navigation.navigate('SettingsModal')}
      >
        3 dagar kvar
      </Text>
      <View style={{ bottom: 100, position: 'absolute' }}>
        <Button
          title={pressed ? 'Mensen är slut' : 'Mensen har börjat'}
          onPress={() => {
            togglePressed();
            addDates();
          }}
        />
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
