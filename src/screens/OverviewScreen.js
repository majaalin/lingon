import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";

const ls = require("local-storage");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Overview() {
  return (
    <View style={styles.container}>
      <Text style={typography.buttonSecondary}>3 dagar kvar</Text>
      <Text>Senaste mensstart: {ls.get("lastStartDate")}</Text>
      <Text>Antal mensdagar: {ls.get("periodLenght") || "5"}</Text>
      <Text>Menslängd: {ls.get("CycleLenght") || "28"}</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
