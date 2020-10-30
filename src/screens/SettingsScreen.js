import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Switch } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { firebaseAuth } from '../config/keys';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from '../components/Button';
import Header from '../components/Header';

const db = firebase.firestore();

const ls = require('local-storage');

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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 10,
    height: 42,
    marginBottom: 11,
    width: '100%',
  },
  picture: {
    width: 152,
    height: 152,
    backgroundColor: colors.white,
    borderRadius: 152 / 2,
  },
});

export default function Settings({ navigation }) {
  const [cycleLength, setCycleLength] = useState(0);
  const [lastStartDate, setLastStartDate] = useState(0);
  const [periodLength, setPeriodLength] = useState(0);

  return (
    <View style={styles.container}>
      <Header
        title="Inställningar"
        icon="cross"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.picture}></View>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="drop" color={colors.primary} size={26} />
          <Text style={typography.h4}>Menslängd</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={typography.p}>{periodLength} dagar</Text>
          <Entypo name="chevron-small-right" color={colors.primary} size={26} />
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="time-slot" color={colors.primary} size={26} />
          <Text style={typography.h4}>Cykellängd</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={typography.p}>{cycleLength} dagar</Text>
          <Entypo name="chevron-small-right" color={colors.primary} size={26} />
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="flower" color={colors.primary} size={26} />
          <Text style={typography.h4}>Fertilitet</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch ios_backgroundColor={colors.secondary} />
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="rainbow" color={colors.primary} size={26} />
          <Text style={typography.h4}>Få påminnelse</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch ios_backgroundColor={colors.secondary} />
        </View>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
