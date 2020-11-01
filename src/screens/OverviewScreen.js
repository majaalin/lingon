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

let date = new Date();
let today = date.toISOString().split('T')[0];
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
  const [cycleLength, setCycleLength] = useState(0);
  const [lastStartDate, setLastStartDate] = useState(0);
  const [periodLength, setPeriodLength] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [periodDays, setPeriodDays] = useState([]);

  const addDates = () => {
    if (!periodDays.includes(today)) {
      periodDays.push(today);
    }

    if (!periodDays.includes(lastStartDate)) {
      periodDays.push(lastStartDate);
    }

    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.exists && !periodDays.exists) {
          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
              periodDays: periodDays,
            });
          console.log(periodDays);
          return;
        } else {
          setPeriodDays([]);
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
            togglePressed();
            addDates();
          }}
        />
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
