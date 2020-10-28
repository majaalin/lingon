import React, { useReducer, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
const db = firebase.firestore();

let ovulationDate = ['2020-10-01', '2020-10-02', '2020-10-03', '2020-10-04'];

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
  const [cycleLength, setCycleLength] = useState(0);
  const [lastStartDate, setLastStartDate] = useState(0);
  const [periodLength, setPeriodLength] = useState(0);
  const [markedPeriod, setMarkedPeriod] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);
  const [date, setDate] = useState(0);
  const expectedPeriodDate = useState('2020-10-20', '2020-10-21', '2020-10-22');
  const expectedOvulationDate = useState(
    '2020-10-20',
    '2020-10-21',
    '2020-10-22'
  );

  db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setCycleLength(doc.data().cycleLength);
        setLastStartDate(doc.data().lastStartDate);
        setPeriodLength(doc.data().periodLength);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

  // colorDate = () => {
  //   let expectedPeriodDateColored = expectedPeriodDate.reduce(
  //     (c, v) =>
  //       Object.assign(c, {
  //         [v]: {
  //           color: colors.primary,
  //           textColor: colors.white,
  //           endingDay: true,
  //           startingDay: true,
  //         },
  //       }),
  //     {}
  //   );

  //   let ovulationDateColored = ovulationDate.reduce(
  //     (c, v) =>
  //       Object.assign(c, {
  //         [v]: {
  //           color: colors.secondary,
  //           textColor: colors.white,
  //           endingDay: true,
  //           startingDay: true,
  //         },
  //       }),
  //     {}
  //   );

  //   const markedPeriod = Object.assign(
  //     expectedPeriodDateColored,
  //     ovulationDateColored
  //   );

  //   setMarkedPeriod(markedPeriod);
  // };

  return (
    <View>
      <Text>{cycleLength}</Text>
      <Text>{periodLength}</Text>
      <Text>{lastStartDate}</Text>
      <Calendar
        horizontal={true}
        pagingEnabled={true}
        enableSwipeMonths={true}
        markingType={'period'}
        markedDates={{
          ['2020-10-20']: {
            selected: true,
            startingDay: true,
            color: colors.primary,
            disableTouchEvent: true,
            selectedDayTextColor: colors.white,
          },
          ['2020-10-21']: {
            selected: true,
            endingDay: true,
            color: colors.primary,
            disableTouchEvent: true,
            backgroundColor: colors.primary,
            selectedDayTextColor: colors.white,
          },
        }}
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
