import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { panGestureHandler, useValues } from 'react-native-redash';

const { useCode, cond, set, eq, add, Extrapolate, interpolate } = Animated;

interface IProps {
  size: Animated.Value<number>;
  position: Animated.Value<number>;
}

const Thumb = ({ size, position }: IProps) => {
  const [startPosition, isDragging] = useValues([0, 0], []);

  const { state, translationX, gestureHandler } = panGestureHandler();

  useCode(
    () =>
      cond(
        eq(state, State.ACTIVE),
        [
          cond(eq(isDragging, 0), [set(isDragging, 1), set(startPosition, position)]),
          set(
            position,
            interpolate(add(startPosition, translationX), {
              inputRange: [0, size],
              outputRange: [0, size],
              extrapolate: Extrapolate.CLAMP,
            }),
          ),
        ],
        set(isDragging, 0),
      ),
    [size],
  );

  const translateX = position;

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  thumb: {
    width: 30,
    height: 30,
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d6d6d6',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowRadius: 1,
    shadowOpacity: 0.2,
    borderRadius: 50,
    zIndex: 10,
    top: -14,
    left: -15,
  },
});

export default Thumb;
