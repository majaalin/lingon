import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    borderColor: colors.primary,
    borderWidth: 2,
    height: 42,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 42 / 2,
    marginRight: 8,
    marginTop: 18,
    color: colors.primary,
    fontSize: 16,
  },
  pressedButton: {
    borderColor: colors.primary,
    borderWidth: 2,
    height: 42,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 42 / 2,
    marginRight: 8,
    marginTop: 18,
    color: colors.primary,
    fontSize: 16,
  },
});

let symptoms = ['Nere', 'PMS', 'Mensvärk', 'Glad', 'Ledsen'];
let period = ['Lätt', 'Måttlig', 'Riklig'];
let sex = ['Skyddat sex', 'Oskyddat sex'];

export default function Notes({ navigation }) {
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        onPress={() => navigation.goBack()}
        label="Dismiss modal"
        style={typography.h1}
      >
        Anteckningar
      </Text>
      <Text style={typography.h5}>Symptom</Text>
      <View style={{ flexDirection: 'row' }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              style={pressed ? styles.button : styles.pressedButton}
              value={symptom}
              onClick={() => setPressed(true)}
            >
              <Text style={typography.p}>{symptom}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* <TextInput
        style={styles.button}
        placeholder={'Lägg till symtom +'}
        placeholderTextColor={colors.primary}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      ></TextInput> */}
    </View>
  );
}
