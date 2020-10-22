import React, { Component, useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocaleConfig } from "react-native-calendars";
import colors from "../styles/colors";
import typography from "../styles/typography";
import { color } from "react-native-reanimated";

let period = [
  "2020-10-05",
  "2020-10-06",
  "2020-10-08",
  "2020-10-07",
  "2020-10-09",
];

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
    this.getPeriodDate();
  }

  getPeriodDate = () => {
    let obj = period.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: {
            color: colors.primary,
            textColor: colors.white,
          },
        }),
      {}
    );

    this.setState({ markedPeriod: obj });
  };

  render() {
    return (
      <View>
        <Text>{this.state.currentDate}</Text>
        <Calendar
          markingType={"period"}
          markedDates={this.state.markedPeriod}
          horizontal={true}
          pagingEnabled={true}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            {
              console.log("selected day", day.dateString),
                this.setState({ currentDate: day.dateString });
            }
          }}
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
            textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "#333248",
            selectedDayTextColor: "#ffffff",
            todayTextColor: colors.white,
            todayBackgroundColor: colors.primary,
            dayTextColor: colors.primary,
            textDisabledColor: colors.secondary,
            dotColor: colors.primary,
            selectedDotColor: "#ffffff",
            arrowColor: colors.primary,
            disabledArrowColor: "#d9e1e8",
            monthTextColor: colors.primary,
            indicatorColor: colors.primary,
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
