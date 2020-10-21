import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../styles/colors";
import typography from "../styles/typography";

function Button({
  title,
  onPress,
  backgroundColor = "primary",
  font = "buttonPrimary",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[backgroundColor] }]}
      onPress={onPress}
    >
      <Text style={typography[font]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

export default Button;
