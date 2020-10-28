import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';

let notesArray = [];

function NotesButton({ title, date }) {
  const onPressNote = () => {
    if (pressed) {
      setPressed(false);
      const notesArrayIndex = notesArray.indexOf(title);
      notesArray.splice(notesArrayIndex, 1);
      firebase
        .firestore()
        .collection('notes')
        .doc(firebase.auth().currentUser.uid)
        .update({
          Note: notesArray,
        });
    } else {
      setPressed(true);
      notesArray.push(title);
      firebase
        .firestore()
        .collection('notes')
        .doc(firebase.auth().currentUser.uid)
        .set({
          Date: date,
          Note: notesArray,
        });
    }
  };
  const [pressed, setPressed] = useState(false);
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
