import React, { useEffect, useReducer, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
const db = firebase.firestore();
const ls = require('local-storage');

LocaleConfig.locales['sv'] = {
  monthNames: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  dayNames: ['M', 'T', 'O', 'T', 'F', 'L', 'S'],
  dayNamesShort: ['M', 'T', 'O', 'T', 'F', 'L', 'S'],
  today: 'Idag',
};

LocaleConfig.defaultLocale = 'sv';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 28,
    width: 343,
    height: 410,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default function PeriodCalendar() {
  const [period, setPeriod] = useState([ls.get('periodDays')]);
  const [estimatedMenstrualDays, setEstimatedMenstrualDays] = useState([
    'null',
  ]);

  if (estimatedMenstrualDays.includes('null')) {
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setPeriod(doc.data().periodDays);
          setEstimatedMenstrualDays(doc.data().estimatedMenstrualDays);
          return;
        }
      });
  }

  let markedPeriod = period.reduce(
    (c, v) =>
      Object.assign(c, {
        [v]: {
          color: colors.primary,
          textColor: colors.white,
          endingDay: true,
          startingDay: true,
        },
      }),
    {}
  );

  let markedEstimatedMenstrualDays = estimatedMenstrualDays.reduce(
    (c, v) =>
      Object.assign(c, {
        [v]: {
          color: colors.secondary,
          textColor: colors.white,
          endingDay: true,
          startingDay: true,
        },
      }),
    {}
  );

  const allMarked = Object.assign(markedPeriod, markedEstimatedMenstrualDays);

  return (
    <View style={styles.container}>
      <Calendar
        horizontal={true}
        pagingEnabled={true}
        enableSwipeMonths={true}
        markingType={'period'}
        markedDates={allMarked}
        onDayPress={(day) => setDate(day.dateString)}
        onDayLongPress={(day) => {
          console.log('selected day', day.dateString);
        }}
        style={{
          borderRadius: 28,
          height: 410,
          width: 343,
        }}
        theme={{
          backgroundColor: colors.secondary,
          calendarBackground: colors.white,
          textSectionTitleColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.white,
          todayTextColor: colors.white,
          todayBackgroundColor: colors.orange,
          dayTextColor: colors.primary,
          textDisabledColor: colors.secondary,
          dotColor: colors.primary,
          arrowColor: colors.primary,
          monthTextColor: colors.primary,
          textDayFontFamily: 'KarlaRegular',
          textMonthFontFamily: 'KarlaBold',
          textDayHeaderFontFamily: 'KarlaRegular',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            monthText: {
              backgroundColor: colors.primary,
              color: colors.white,
              fontFamily: 'BrandonBold',
              fontSize: 18,
              margin: 10,
              width: 106,
              padding: 8,
              textAlign: 'center',
              borderRadius: 20,
              overflow: 'hidden',
              borderColor: colors.primary,
            },
          },
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10 / 2,
              backgroundColor: colors.primary,
              marginRight: 10,
            }}
          ></View>
          <Text style={typography.h4}>Mens</Text>
        </View>
        <View style={styles.row}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10 / 2,
              backgroundColor: colors.secondary,
              marginRight: 10,
            }}
          ></View>
          <Text style={typography.h4}>Förväntad mens</Text>
        </View>
      </View>
    </View>
  );
}
