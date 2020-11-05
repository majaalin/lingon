import React, { useRef } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import PageControl from 'react-native-page-control';
import Range from '../components/Range';
import colors from '../styles/colors';
import typography from '../styles/typography';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import * as Animatable from 'react-native-animatable';
const ls = require('local-storage');

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

export default function CycleLength({ navigation }) {
  const AnimationRef = useRef(null);

  const animation = () => {
    if (AnimationRef) {
      AnimationRef.current?.pulse();
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <PageControl
          numberOfPages={3}
          currentPage={1}
          hidesForSinglePage
          pageIndicatorTintColor={colors.primary}
          currentPageIndicatorTintColor={colors.white}
          indicatorStyle={{ borderRadius: 5 }}
          currentIndicatorStyle={{ borderRadius: 5 }}
          indicatorSize={{ width: width / 3 - 20, height: 5 }}
          style={{ marginTop: 20 }}
        />
      </View>

      <View style={styles.container}>
        <Text style={typography.h1}>Ange längd på din menscykel</Text>
        <Range average={28} arrayLength={40} keyValue="CycleLength" />
      </View>

      <View style={{ bottom: 30, position: 'absolute' }}>
        <Animatable.View ref={AnimationRef}>
          <ButtonSecondary
            title="Fyll i senare"
            backgroundColor="secondary"
            font="buttonSecondary"
          />
        </Animatable.View>
        <Animatable.View ref={AnimationRef}>
          <ButtonPrimary
            title="Fortsätt"
            onPress={() => {
              {
                animation();
                setTimeout(() => {
                  navigation.navigate('PeriodLengthScreen');
                }, 700);
              }
            }}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}
