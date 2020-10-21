import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class Button extends React.Component {
  render() {
    return <TouchableOpacity style={styles.button} onPress={onPress} />;
  }
}
