import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { Entypo } from '@expo/vector-icons';

function Header({ title, icon, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={typography.navigation}>{title}</Text>
      <Entypo
        name={icon}
        color={colors.primary}
        size={24}
        onPress={onPress}
        style={{ right: 20, position: 'absolute' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    top: -60,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Header;
