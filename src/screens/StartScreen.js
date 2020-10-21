import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebaseAuth } from "../config/keys";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Button from "../components/Button";
import Range from "../components/Range";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Start({ navigation }) {
  // signInAnonymously = () => {
  //   firebaseAuth
  //     .signInAnonymously()
  //     .then(() => navigation.navigate("Overview", { type: "anonymous" }))
  //     .catch((error) => {
  //       this.setState({ errorMessage: error.message }, () => {
  //         console.log(error);
  //       });
  //     });
  // };

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Välkommen</Text>
      <Text style={typography.h5}>
        Svara på några frågor och vi kommer anpassa appen för dig
      </Text>
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
      <Range average={27} arrayLength={40} />
      <Range average={4} arrayLength={20} />
    </View>
  );
}
