import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import colors from "../styles/colors";
import typography from "../styles/typography";

const width = Dimensions.get("window").width - 20;

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
    width: width,
    height: 60,
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

export default Button;
