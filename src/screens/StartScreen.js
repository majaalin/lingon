import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="bounceInDown" style={typography.h1}>
        Välkommen
      </Animatable.Text>
      <Animatable.Text
        animation="bounceInDown"
        delay={1000}
        style={[typography.h5, { textAlign: 'center', marginTop: 30 }]}
      >
        Svara på några frågor och vi kommer att anpassa appen för dig.
      </Animatable.Text>
      <View style={{ bottom: 30, position: 'absolute' }}>
        <Animatable.View animation="bounceInLeft" delay={1500}>
          <ButtonSecondary
            title="Logga in"
            backgroundColor="secondary"
            font="buttonSecondary"
            onPress={() => navigation.navigate('Login')}
          />
        </Animatable.View>
        <Animatable.View animation="bounceInRight" delay={1500}>
          <ButtonPrimary
            title="Kom igång"
            onPress={() => navigation.navigate('LatestStartDate')}
          />
        </Animatable.View>
      </View>
    </View>
  );
}
