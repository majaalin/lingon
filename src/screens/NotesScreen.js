import React, { useState, useEffect } from 'react';
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
import CalendarStrip from 'react-native-calendar-strip';
const ls = require('local-storage');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
  const [selectedDate, setSelectedDate] = useState(date);

  return (
    <View style={styles.container}>
      <Text
        onPress={() => navigation.goBack()}
        label="Dismiss modal"
        style={typography.h1}
      >
        {selectedDate}
      </Text>
      <CalendarStrip
        showMonth={false}
        selectedDate={selectedDate}
        onDateSelected={(date) => {
          const newDate = date.format('YYYY-MM-DD');
          setSelectedDate(newDate);
        }}
        highlightColor={'#9265DC'}
        highlightDateNumberStyle={{
          color: colors.white,
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 50,
          borderColor: 'green',
        }}
        highlightDateNameStyle={{
          color: colors.primary,
        }}
        markedDatesStyle={{ backgroundColor: colors.primary }}
        dateNumberStyle={{
          color: colors.primary,
          padding: 10,
        }}
        dateNameStyle={{ color: colors.primary }}
        calendarColor={colors.white}
        iconLeft="none"
        iconRight="none"
        style={{
          height: 60,
          marginRight: 20,
          borderRadius: 5,
        }}
      />
      <Text style={typography.h5}>Symptom</Text>
      <View style={{ flexDirection: 'row', marginBottom: 40 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {symptomNotes.map((symptom) => (
            <NotesButton title={symptom} date={selectedDate} />
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
          <NotesButton title={period} date={selectedDate} />
        ))}
      </View>
      <Text style={typography.h5}>Sex</Text>
      <View style={{ flexDirection: 'row', marginBottom: 40 }}>
        {sexNotes.map((sex) => (
          <NotesButton title={sex} date={selectedDate} />
        ))}
      </View>
    </View>
  );
}
