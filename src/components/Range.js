import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import SmoothPicker from 'react-native-smooth-picker';
import colors from '../styles/colors';
import typography from '../styles/typography';
const ls = require('local-storage');

const opacities = {
  0: 1,
  3: 0.5,
};

const Item = React.memo(({ opacity, selected, name }) => {
  return (
    <View
      style={[
        styles.OptionWrapper,
        {
          opacity,
          width: selected ? 72 : 60,
          height: selected ? 72 : 60,
          marginTop: selected ? 13 : 20,
          backgroundColor: selected ? colors.primary : colors.secondary,
        },
      ]}
    >
      <Text
        style={[
          selected ? typography.h2 : typography.clarification,
          { color: selected ? colors.white : colors.primary },
        ]}
      >
        {name}
      </Text>
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      name={item}
    />
  );
};

const Range = ({ average, arrayLength, keyValue }) => {
  function handleChange(index) {
    setSelected(index);
    ls.set(keyValue, index);
  }

  const [isHidden, setIsHidden] = useState(0);
  const [selected, setSelected] = useState(average);

  setTimeout(() => {
    setIsHidden(1);
  }, 1600);

  return (
    <View style={styles.wrapperHorizontal}>
      <SmoothPicker
        style={{ opacity: isHidden }}
        initialScrollToIndex={selected}
        onScrollToIndexFailed={() => {}}
        keyExtractor={(_, index) => index.toString()}
        data={Array.from({ length: arrayLength }, (_, i) => i)}
        horizontal={true}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        onSelected={({ item, index }) => handleChange(index)}
        renderItem={(option) => ItemToRender(option, selected, true)}
        magnet={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperHorizontal: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

export default Range;
