import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import PeriodCalendar from '../components/Calendar';
import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default function Calendar({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        title="Kalender"
        icon="cog"
        onPress={() => navigation.navigate('SettingsModal')}
      />
      <PeriodCalendar />
    </View>
  );
}
