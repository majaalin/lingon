import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

import colors from '../styles/colors';
import typography from '../styles/typography';

const width = Dimensions.get('window').width - 30;

function ButtonPrimary({
  title,
  onPress,
  backgroundColor = 'primary',
  font = 'buttonPrimary',
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors[backgroundColor] }]}
    >
      <Text style={typography[font]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 60,
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default ButtonPrimary;
