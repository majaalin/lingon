import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import KarlaBold from './assets/fonts/Karla-Bold.ttf';
import KarlaRegular from './assets/fonts/Karla-Regular.ttf';
import BrandonBold from './assets/fonts/BrandonGrotesque-Bold.ttf';
import BrandonRegular from './assets/fonts/BrandonGrotesque-Regular.ttf';
import colors from './styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'KarlaBold',
  },
  p: {
    fontFamily: 'KarlaRegular',
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    KarlaBold,
    KarlaRegular,
    BrandonBold,
    BrandonRegular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lingon</Text>
      <Text style={styles.p}>Lingon</Text>
      <Text style={{ fontFamily: 'BrandonBold' }}>Lingon</Text>
      <Text style={{ fontFamily: 'BrandonRegular' }}>Lingon</Text>
    </View>
  );
}