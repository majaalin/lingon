import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import NotesButton from '../components/NotesButton';
import CalendarStrip from 'react-native-calendar-strip';
import Header from '../components/Header';
const ls = require('local-storage');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'space-around',
    marginTop: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#7B6160',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
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
      <Header title="Symtom" icon="cross" onPress={() => navigation.goBack()} />
      <View
        style={{
          paddingLeft: 20,
          marginTop: 60,
        }}
      >
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
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 300,
          highlightColor: colors.primary,
        }}
        showMonth={false}
        selectedDate={selectedDate}
        onDateSelected={(date) => {
          const newDate = date.format('YYYY-MM-DD');
          setSelectedDate(newDate);
        }}
        highlightDateNumberStyle={{
          color: colors.white,
        }}
        highlightDateNameStyle={{
          color: colors.white,
        }}
        dateNumberStyle={{
          color: colors.primary,
        }}
        dateNameStyle={{ color: colors.primary }}
        calendarColor={colors.white}
        iconLeft="none"
        iconRight="none"
        style={{
          height: 60,
          marginRight: 20,
          borderRadius: 60 / 2,
          marginLeft: 20,
        }}
      />
    </View>
  );
}
