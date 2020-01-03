import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useValues } from 'react-native-redash';
import Thumb from './Thumb';
import ThumbTrack from './ThumbTrack';

const { Value, useCode, block, cond, and, greaterOrEq, lessThan, neq, call, set } = Animated;

interface IStepValues {
  min: number;
  max: number;
  step: number;
}

interface ISliderProps extends IStepValues {
  onValueChange: (value: number) => void;
  value?: number;
}

export interface IOffsets {
  index: number;
  // offsetX: Animated.Value<number>,
  offsetMin: Animated.Value<number>;
  offsetMax: Animated.Value<number>;
}

const Slider = ({ min, max, step, onValueChange, value }: ISliderProps) => {
  const [sliderSize, setSliderSize] = useState(0);
  const [segments, setSegments] = useState<IOffsets[]>([]);
  const [nativeSize, position, activeValue] = useValues([0, 0, 0], []);

  // if(value) {
  //   if (value <= max && value >= min) {
  //     throw "Slider property \"value\" is incorrect"
  //   }
  // }

  const count = (max - min + step) / step;
  const offset = sliderSize / count;
  console.log(segments.length, count);
  // console.log()

  useEffect(() => {
    if (sliderSize !== 0) {
      const offsets = createOffsets({ max, min, step, sliderSize });
      if (value) {
        // const valueIndex = (value - step) / step;
        // const offset = offsets.find(({ index }) => index === valueIndex);
        // console.log(offset)
      }

      setSegments(offsets);
    }
  }, [sliderSize]);

  useCode(
    () =>
      cond(neq(nativeSize, 0), [
        // call([position], (position) => console.log(position))

        block(
          segments.map(({ offsetMin, offsetMax, index }) =>
            cond(
              and(
                greaterOrEq(position, offsetMin),
                lessThan(position, offsetMax),
                neq(activeValue, index),
              ),
              [call([], () => onValueChange(index * step)), set(activeValue, index)],
            ),
          ),
        ),
      ]),
    [segments],
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

type CreateOffsets = (args: IStepValues & { sliderSize: number }) => IOffsets[];

const createOffsets: CreateOffsets = ({ max, min, step, sliderSize }) => {
  const segments = [];

  if (sliderSize !== 0) {
    const count = (max - min) / step;
    const width = sliderSize / count;
    let startOffset = 0;

    for (let i = 0; i <= count; i++) {
      const isEdge = i === 0 || i === count;
      const stepOffset = isEdge ? width / 2 : width;
      const endOffset = startOffset + stepOffset;
      segments.push({
        index: i,
        offsetMin: new Value(Math.round(startOffset)),
        offsetMax: new Value(Math.round(endOffset)),
      });
      startOffset += stepOffset;
    }
  }

  return segments;
};
