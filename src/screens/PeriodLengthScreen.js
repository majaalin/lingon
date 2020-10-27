import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import PageControl from 'react-native-page-control';
import Range from '../components/Range';
import colors from '../styles/colors';
import typography from '../styles/typography';
import Button from '../components/Button';
import { firebaseAuth } from '../config/keys';
import firebase from 'firebase';
const ls = require('local-storage');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const width = Dimensions.get('window').width;

export class PeriodLength extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const signInAnonymously = () => {
      const today = new Date();
      let lastStartDate =
        (ls.get('lastStartDate') && ls.get('lastStartDate')) || today;
      let periodLenght =
        (ls.get('periodLenght') && ls.get('periodLenght')) || 5;
      let cycleLenght = (ls.get('CycleLenght') && ls.get('CycleLenght')) || 28;
      firebaseAuth
        .signInAnonymously()
        .then((result) => {
          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              lastStartDate: lastStartDate,
              periodLenght: periodLenght,
              cycleLenght: cycleLenght,
            });
          console.log(result);
        })
        .then(() => navigate('Overview', { type: 'anonymous' }))
        .catch((error) => {
          this.setState({ errorMessage: error.message }, () => {
            console.log(error);
          });
        });
    };

    return (
      <View style={styles.wrapper}>
        <SafeAreaView>
          <PageControl
            numberOfPages={3}
            currentPage={2}
            hidesForSinglePage
            pageIndicatorTintColor={colors.primary}
            currentPageIndicatorTintColor={colors.white}
            indicatorStyle={{ borderRadius: 5 }}
            currentIndicatorStyle={{ borderRadius: 5 }}
            indicatorSize={{ width: width / 3 - 20, height: 5 }}
            onPageIndicatorPress={this.onItemTap}
          />
        </SafeAreaView>

        <View style={styles.container}>
          <Text style={typography.h1}>Ange antal dagar du har mens</Text>
          <Range average={5} arrayLength={20} keyValue="periodLenght" />
          <View style={{ bottom: 20, position: 'absolute' }}>
            <Button
              title="Fyll i senare"
              backgroundColor="secondary"
              font="buttonSecondary"
            />
            <Button title="Fortsätt" onPress={() => signInAnonymously()} />
          </View>
        </View>
      </View>
    );
  }
}

export default PeriodLength;
