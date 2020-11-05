import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import PageControl from 'react-native-page-control';
import DatePicker from '../components/DatePicker';
import colors from '../styles/colors';
import typography from '../styles/typography';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 540,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const width = Dimensions.get('window').width;

export class LatestStartDate extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.wrapper}>
        <PageControl
          numberOfPages={3}
          currentPage={0}
          hidesForSinglePage
          pageIndicatorTintColor={colors.primary}
          currentPageIndicatorTintColor={colors.white}
          indicatorStyle={{ borderRadius: 5 }}
          currentIndicatorStyle={{ borderRadius: 5 }}
          indicatorSize={{ width: width / 3 - 20, height: 5 }}
          onPageIndicatorPress={this.onItemTap}
          style={{ marginTop: 20 }}
        />
        <View style={styles.container}>
          <Animatable.Text
            animation="bounceInDown"
            delay={500}
            style={typography.h1}
          >
            Ange när senaste mensen startade
          </Animatable.Text>
          <Animatable.View animation="bounceInDown" delay={1000}>
            <DatePicker />
          </Animatable.View>
        </View>

        <View style={{ bottom: 30, position: 'absolute' }}>
          <Animatable.View animation="bounceInLeft" delay={1500}>
            <ButtonSecondary
              title="Fyll i senare"
              backgroundColor="secondary"
              font="buttonSecondary"
            />
          </Animatable.View>
          <Animatable.View animation="bounceInRight" delay={1500}>
            <ButtonPrimary
              title="Fortsätt"
              onPress={() => navigate('CycleLengthScreen')}
            />
          </Animatable.View>
        </View>
      </SafeAreaView>
    );
  }
}

export default LatestStartDate;
