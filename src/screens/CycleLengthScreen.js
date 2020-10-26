import React, { Component } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from "react-native";
import PageControl from "react-native-page-control";
import Range from "../components/Range";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Button from "../components/Button";
const ls = require("local-storage");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

const width = Dimensions.get("window").width;

export class CycleLength extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapper}>
        <SafeAreaView>
          <View>
            <PageControl
              numberOfPages={3}
              currentPage={1}
              hidesForSinglePage
              pageIndicatorTintColor={colors.primary}
              currentPageIndicatorTintColor={colors.white}
              indicatorStyle={{ borderRadius: 5 }}
              currentIndicatorStyle={{ borderRadius: 5 }}
              indicatorSize={{ width: width / 3 - 20, height: 5 }}
              onPageIndicatorPress={this.onItemTap}
            />
          </View>
        </SafeAreaView>

        <View style={styles.container}>
          <Text style={typography.h1}>Ange längd på din menscykel</Text>
          <Range average={28} arrayLength={40} keyValue="CycleLenght" />
          <View style={{ bottom: 20, position: "absolute" }}>
            <Button
              title="Fyll i senare"
              backgroundColor="secondary"
              font="buttonSecondary"
            />
            <Button
              title="Fortsätt"
              onPress={() => navigate("PeriodLengthScreen")}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CycleLength;
