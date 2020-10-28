import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';

const ls = require('local-storage');
const db = firebase.firestore();

let notesArray = [];

function NotesButton({ title, date }) {
  const [pressed, setPressed] = useState(false);
  db.collection(firebase.auth().currentUser.uid)
    .doc(date)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        ls.set('hej', doc.data().Note);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

  const onPressNote = () => {
    if (pressed) {
      setPressed(false);
      const notesArrayIndex = notesArray.indexOf(title);
      notesArray.splice(notesArrayIndex, 1);
      firebase
        .firestore()
        .collection(firebase.auth().currentUser.uid)
        .doc(date)
        .update({
          Note: notesArray,
        });
    } else {
      setPressed(true);
      notesArray.push(title);
      firebase
        .firestore()
        .collection(firebase.auth().currentUser.uid)
        .doc(date)
        .set({
          Note: notesArray,
        });
    }
  };

  const hejhejhej = ls.get('hej') || ['empty'];

  if (hejhejhej.includes(title)) {
    return (
      <TouchableOpacity
        style={styles.pressedButton}
        onPress={() => onPressNote({ title, date })}
      >
        <Text style={typography.buttonPrimary}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={pressed ? styles.pressedButton : styles.button}
      onPress={() => onPressNote({ title, date })}
    >
      <Text
        style={pressed ? typography.buttonPrimary : typography.buttonSecondary}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.primary,
    borderWidth: 2,
    height: 42,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 42 / 2,
    marginRight: 8,
    marginTop: 18,
    color: colors.primary,
    fontSize: 16,
  },
  pressedButton: {
    borderColor: colors.primary,
    borderWidth: 2,
    height: 42,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 42 / 2,
    marginRight: 8,
    marginTop: 18,
    backgroundColor: colors.primary,
    fontSize: 16,
  },
});

export default NotesButton;
