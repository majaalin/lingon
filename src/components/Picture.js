import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  image: {
    width: 152,
    height: 152,
    borderRadius: 152 / 2,
    resizeMode: 'contain',
  },
});

const Picture = ({ source }) => {
  return <Image style={styles.image} source={source} />;
};

export default Picture;
