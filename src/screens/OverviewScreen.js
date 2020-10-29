import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
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
  },
});

export default function Overview({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        title="Överblick"
        icon="cog"
        onPress={() => navigation.navigate('SettingsModal')}
      />
      <Text style={typography.buttonSecondary}>3 dagar kvar</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
