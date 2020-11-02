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

export default function PeriodCalendar() {
  const [period, setPeriod] = useState(['null']);
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
    <View>
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
          margin: 20,
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
    </View>
  );
}
