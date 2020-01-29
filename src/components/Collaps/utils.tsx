import Animated from 'react-native-reanimated';

const { Value } = Animated;

const initArray = (count: number) => new Array(count).fill(0);

export const getValues = (count: number) => {
  return initArray(count).map(v => ({
    state: false,
    stat: new Value(0),
    position: new Value(0),
  }));
};
