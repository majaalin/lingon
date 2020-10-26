import React, { Component, useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocaleConfig } from "react-native-calendars";
import colors from "../styles/colors";
import typography from "../styles/typography";
import { color } from "react-native-reanimated";
import CycleLength from "../screens/CycleLengthScreen";
import { formatDistance, subDays } from "date-fns";

const ls = require("local-storage");

let date = ls.get("lastStartDate") || "2020-10-01T";

let lastStartDate = date.split("T")[0];
let periodLenght = ls.get("periodLenght");
let cycleLength = ls.get("CycleLenght");

let ovulationDate = ["2020-10-01", "2020-10-02", "2020-10-03", "2020-10-04"];

let periodDate = [lastStartDate];

LocaleConfig.locales["sv"] = {
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ],
  dayNames: ["M", "T", "O", "T", "F", "L", "S"],
  dayNamesShort: ["M", "T", "O", "T", "F", "L", "S"],
  today: "Idag",
};
LocaleConfig.defaultLocale = "sv";

export class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedPeriod: null,
      currentDate: null,
    };
  }

  componentDidMount() {
    this.colorDate();
  }

  colorDate = () => {
    let periodDateColored = periodDate.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: {
            color: colors.primary,
            textColor: colors.white,
            endingDay: true,
            startingDay: true,
          },
        }),
      {}
    );

    let ovulationDateColored = ovulationDate.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: {
            color: colors.secondary,
            textColor: colors.white,
            endingDay: true,
            startingDay: true,
          },
        }),
      {}
    );

    const markedPeriod = Object.assign(periodDateColored, ovulationDateColored);

    this.setState({ markedPeriod: markedPeriod });
  };

  render() {
    return (
      <View>
        <Text>{lastStartDate}</Text>
        <Text>{this.state.currentDate}</Text>
        <Calendar
          horizontal={true}
          pagingEnabled={true}
          enableSwipeMonths={true}
          markingType={"period"}
          markedDates={{
            [this.state.date]: { selected: true },
          }}
          markedDates={this.state.markedPeriod}
          onDayPress={(day) => this.setState({ date: day.dateString })}
          onDayLongPress={(day) => {
            console.log("selected day", day.dateString);
          }}
          style={{
            margin: 20,
            borderRadius: 28,
            height: 410,
            width: 343,
          }}
          theme={{
            backgroundColor: colors.secondary,
            calendarBackground: colors.white,
            textSectionTitleColor: colors.primary,
            selectedDayBackgroundColor: colors.grey,
            selectedDayTextColor: colors.grey,
            todayTextColor: colors.white,
            todayBackgroundColor: colors.grey,
            dayTextColor: colors.primary,
            textDisabledColor: colors.secondary,
            dotColor: colors.primary,
            arrowColor: colors.primary,
            monthTextColor: colors.primary,
            textDayFontFamily: "KarlaRegular",
            textMonthFontFamily: "KarlaBold",
            textDayHeaderFontFamily: "KarlaRegular",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
            "stylesheet.calendar.header": {
              week: {
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              },
              monthText: {
                backgroundColor: colors.primary,
                color: colors.white,
                fontFamily: "BrandonBold",
                fontSize: 18,
                margin: 10,
                width: 106,
                padding: 8,
                textAlign: "center",
                borderRadius: 20,
                overflow: "hidden",
                borderColor: colors.primary,
              },
            },
          }}
        />
      </View>
    );
  }
}

export default Calender;
