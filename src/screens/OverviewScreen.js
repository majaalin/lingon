import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';

const db = firebase.firestore();

const ls = require('local-storage');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Overview() {
  const [cycleLenght, setCycleLenght] = useState(0);
  const [lastStartDate, setLastStartDate] = useState(0);
  const [periodLenght, setPeriodLenght] = useState(0);

  db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setCycleLenght(doc.data().cycleLenght);
        setLastStartDate(doc.data().lastStartDate);
        setPeriodLenght(doc.data().periodLenght);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

  return (
    <View style={styles.container}>
      <Text style={typography.buttonSecondary}>3 dagar kvar</Text>
      <Text>Senaste mensstart: {lastStartDate}</Text>
      <Text>Antal mensdagar: {periodLenght}</Text>
      <Text>Menslängd: {cycleLenght}</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
