import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import PeriodCalendar from '../components/Calendar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Calendar() {
  return (
    <View style={styles.container}>
      <PeriodCalendar />
    </View>
  );
}
