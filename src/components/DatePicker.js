import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../styles/colors';
const ls = require('local-storage');

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    ls.set('lastStartDate', currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <DateTimePicker
        mode="date"
        value={date}
        style={{
          width: 300,
          opacity: 1,
          height: 125,
        }}
        onChange={onChange}
        is24Hour={true}
        textColor={colors.primary}
      />
    </View>
  );
};

export default DatePicker;
