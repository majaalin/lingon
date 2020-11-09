import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';

const db = firebase.firestore();

function NotesButton({ title, date, id }) {
  const [pressed, setPressed] = useState(false);
  const [notesArray, setNotesArray] = useState([]);

  const AnimationRef = useRef(null);

  const animation = () => {
    if (AnimationRef) {
      AnimationRef.current?.pulse();
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    db.collection(firebase.auth().currentUser.uid)
      .doc(date)
      .get()
      .then(function (doc) {
        if (!doc.exists) {
          setNotesArray(['null']);
        }
      });
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    db.collection(firebase.auth().currentUser.uid)
      .doc(date)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          isSubscribed ? setNotesArray(doc.data().Note) : null;
        }
      });
    return () => (isSubscribed = false);
  }, []);

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
      <Animatable.View ref={AnimationRef}>
        <TouchableOpacity
          style={styles.pressedButton}
          key={id}
          onPress={() => {
            {
              animation();
              onPressNote({ title, date });
            }
          }}
        >
          <Text style={typography.buttonPrimary}>{title}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
  return (
    <Animatable.View ref={AnimationRef}>
      <TouchableOpacity
        style={
          pressed
            ? styles.pressedButton
            : styles.button && notesArray.includes(title)
            ? styles.pressedButton
            : styles.button
        }
        key={id}
        onPress={() => {
          {
            animation();
            onPressNote({ title, date });
          }
        }}
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
    </Animatable.View>
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
    shadowColor: '#E92206',
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
