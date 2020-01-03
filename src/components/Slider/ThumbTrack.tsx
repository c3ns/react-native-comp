import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

interface IThumbTrackProps {
  position: Animated.Value<number>;
}

const ThumbTrack = ({ position }: IThumbTrackProps) => {
  const width = position;

  return <Animated.View style={[styles.thumbTrack, { width }]} />;
};

export default ThumbTrack;

const styles = StyleSheet.create({
  thumbTrack: {
    height: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'red',
    zIndex: 5,
  },
});
