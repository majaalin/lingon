import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// eslint-disable-next-line react/prop-types
export default function Notes({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        // eslint-disable-next-line react/prop-types
        onPress={() => navigation.goBack()}
        label="Dismiss modal"
        style={typography.h1}
      >
        Anteckningar
      </Text>
      <Text style={typography.h5}>Periods are cool. Period.</Text>
    </View>
  );
}
