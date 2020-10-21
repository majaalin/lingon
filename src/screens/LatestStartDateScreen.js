import React, { Component } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from "react-native";
import { PageControlJaloro } from "react-native-chi-page-control";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Button from "../components/Button";

const width = Dimensions.get("window").width;

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
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export class LatestStartDate extends Component {
  state = {
    progress: 0,
  };

  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SafeAreaView>
          <PageControlJaloro
            progress={this.state.progress}
            numberOfPages={3}
            activeTintColor={colors.primary}
            inactiveTintColor={colors.white}
            animationDuration={300}
            width={width / 3}
            style={{
              margin: 0,
            }}
          />
        </SafeAreaView>
        <View style={styles.container}>
          <Text style={typography.h1}>Ange när senaste mensen startade</Text>
          <Button
            title="Fyll i senare"
            backgroundColor="secondary"
            font="buttonSecondary"
          />
          <Button title="Fortsätt" />
        </View>
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <View
        style={{
          height: 100,
          width: width,
          backgroundColor: item,
          borderColor: colors.primary,
          borderWidth: 2,
        }}
      />
    );
  }

  onScroll(e) {
    this.setState({
      progress: e.nativeEvent.contentOffset.x / ((3 - 1) * width),
    });
  }
}

export default LatestStartDate;
