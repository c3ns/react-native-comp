import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useValues } from 'react-native-redash';
import Thumb from './Thumb';
import ThumbTrack from './ThumbTrack';

const { useCode, cond, neq, call, set, interpolate, floor } = Animated;

interface IStepValues {
  min: number;
  max: number;
  step: number;
}

interface ISliderProps extends IStepValues {
  onValueChange: (value: number) => void;
  value?: number;
}

const Slider = ({ min, max, step, onValueChange, value }: ISliderProps) => {
  const [sliderSize, setSliderSize] = useState(0);
  const [nativeSize, position, activeValue, minValue, maxValue] = useValues(
    [0, 0, 0, min, max],
    [],
  );

  // if(value) {
  //   if (value <= max && value >= min) {
  //     throw "Slider property \"value\" is incorrect"
  //   }
  // }

  const count = (max - min + step) / step;
  const offset = sliderSize / count;

  const handleOnValueChange = ([val]: any) => {
    onValueChange(val);
  };

  useCode(
    () =>
      cond(neq(nativeSize, 0), [
        set(
          activeValue,
          floor(
            interpolate(position, {
              inputRange: [0, nativeSize],
              outputRange: [minValue, maxValue],
            }),
          ),
        ),
        call([activeValue], handleOnValueChange),
      ]),
    [nativeSize],
  );

  const handleOnLayout = ({ nativeEvent }: any) => {
    const { width } = nativeEvent.layout;
    nativeSize.setValue(width);
    setSliderSize(width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderCont} onLayout={handleOnLayout}>
        <Thumb size={nativeSize} position={position} />
        <ThumbTrack position={position} />
      </View>
    </View>
  );
};

Slider.defaultProps = {
  min: 1,
  max: 5,
  step: 1,
  onValueChange: () => {},
  value: null,
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  sliderCont: {
    zIndex: 1,
    width: '100%',
    height: 2,
    backgroundColor: '#d6d6d6',
  },
});
