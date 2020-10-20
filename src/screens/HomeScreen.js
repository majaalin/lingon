import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={typography.buttonSecondary}>3 dagar kvar</Text>

      <StatusBar barStyle="light-content" />
    </View>
  );
}
