import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Button from "../components/Button";

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
      <View style={{ bottom: 20, position: "absolute" }}>
        <Button
          title="Logga in"
          backgroundColor="secondary"
          font="buttonSecondary"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Kom igång"
          onPress={() => navigation.navigate("LatestStartDate")}
        />
      </View>
    </View>
  );
}
