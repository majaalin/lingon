import React from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
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

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Välkommen</Text>
      <Text style={typography.h5}>
        Svara på några frågor och vi kommer anpassa appen för dig
      </Text>
      <Text style={typography.buttonSecondary}>Logga in</Text>
      <Text style={typography.buttonPrimary}>Kom igång</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
