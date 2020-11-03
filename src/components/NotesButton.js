import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';

const db = firebase.firestore();

function NotesButton({ title, date, id }) {
  const [pressed, setPressed] = useState(false);
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    setPressed();
  }, [pressed]);

  db.collection(firebase.auth().currentUser.uid)
    .doc(date)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setNotesArray(doc.data().Note);
        return;
      } else {
        setNotesArray([]);
      }
    });

  const onPressNote = () => {
    if (pressed || notesArray.includes(title)) {
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
      if (!notesArray.includes(title)) {
        notesArray.push(title);
      }
      firebase
        .firestore()
        .collection(firebase.auth().currentUser.uid)
        .doc(date)
        .set({
          Note: notesArray,
        });
    }
  };

  if (notesArray.includes(title)) {
    return (
      <TouchableOpacity
        style={styles.pressedButton}
        key={id}
        onPress={() => onPressNote({ title, date })}
      >
        <Text style={typography.buttonPrimary}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={
        pressed
          ? styles.pressedButton
          : styles.button && notesArray.includes(title)
          ? styles.pressedButton
          : styles.button
      }
      key={id}
      onPress={() => onPressNote({ title, date })}
    >
      <Text
        style={
          pressed
            ? typography.buttonPrimary
            : typography.buttonSecondary && notesArray.includes(title)
            ? typography.buttonPrimary
            : typography.buttonSecondary
        }
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
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
