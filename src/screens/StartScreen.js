import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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

export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Välkommen</Text>
      <Text style={typography.h5}>
        Svara på några frågor och vi kommer anpassa appen för dig
      </Text>
      <Button
        style={typography.h1}
        title="Logga in"
        onPress={() => navigation.navigate("login")}
      />
      <Button
        style={typography.h5}
        title="Kom igång"
        onPress={() => navigation.navigate("register")}
      />
    </View>
  );
}
