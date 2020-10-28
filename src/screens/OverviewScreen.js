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

export default function Overview({ navigation }) {
  const [cycleLength, setCycleLength] = useState(0);
  const [lastStartDate, setLastStartDate] = useState(0);
  const [periodLength, setPeriodLength] = useState(0);

  db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setCycleLength(doc.data().cycleLength);
        setLastStartDate(doc.data().lastStartDate);
        setPeriodLength(doc.data().periodLength);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

  return (
    <View style={styles.container}>
      <Text
        style={typography.buttonSecondary}
        onPress={() => navigation.navigate('SettingsModal')}
      >
        3 dagar kvar
      </Text>
      <Text>Senaste mensstart: {lastStartDate}</Text>
      <Text>Antal mensdagar: {periodLength}</Text>
      <Text>Menslängd: {cycleLength}</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
