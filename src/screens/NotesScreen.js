import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Notes() {
  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Anteckningar</Text>
      <Text style={typography.h5}>Periods are cool. Period.</Text>
    </View>
  );
}
