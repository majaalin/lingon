import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import NotesButton from '../components/NotesButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginLeft: 20,
  },
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

let today = new Date();
let date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

let symptomNotes = ['Nere', 'PMS', 'Mensvärk', 'Glad', 'Ledsen'];
let periodNotes = ['Lätt', 'Måttlig', 'Riklig'];
let sexNotes = ['Skyddat sex', 'Oskyddat sex'];

export default function Notes({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => navigation.goBack()}
        label="Dismiss modal"
        style={{ marginBottom: 40 }}
      >
        {date}
      </Text>
      <Text style={typography.h5}>Symptom</Text>
      <View style={{ flexDirection: 'row', marginBottom: 40 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {symptomNotes.map((symptom) => (
            <NotesButton title={symptom} date={date} />
          ))}
        </ScrollView>
      </View>
      {/* <TextInput
        style={styles.button}
        placeholder={'Lägg till symtom +'}
        placeholderTextColor={colors.primary}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      ></TextInput> */}
      <Text style={typography.h5}>Mens</Text>
      <View style={{ flexDirection: 'row', marginBottom: 40 }}>
        {periodNotes.map((period) => (
          <NotesButton title={period} date={date} />
        ))}
      </View>
      <Text style={typography.h5}>Sex</Text>
      <View style={{ flexDirection: 'row', marginBottom: 40 }}>
        {sexNotes.map((sex) => (
          <NotesButton title={sex} date={date} />
        ))}
      </View>
    </View>
  );
}
