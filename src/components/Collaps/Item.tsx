import React from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useValues, timing, useClocks } from 'react-native-redash';
import Animated from 'react-native-reanimated';

const { block, useCode, not, cond, eq, set, clockRunning, stopClock, and, call, neq } = Animated;

let isActive = false;

const Item = ({ data, renderHeader, renderContent }: any) => {
  const [state, height, transition, isRunning, position, dest] = useValues([0, 0, 0, 0, 0, 0], []);
  const [clock] = useClocks(1, []);

  useCode(
    () =>
      block([
        call([], () => console.log('asd')),
        cond(eq(isRunning, 0), [
          set(isRunning, 1),
          set(position, transition),
          set(dest, cond(eq(state, 1), height, 0)),
        ]),
        set(
          transition,
          timing({
            from: position,
            to: dest,
            duration: 250,
            clock,
          }),
        ),
        cond(not(clockRunning(clock)), set(isRunning, 0)),
      ]),
    [],
  );

  const handleOnPress = () => {
    // @ts-ignore
    state.setValue(+!isActive);
    isActive = !isActive;
  };

  const handleOnLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const h: any = nativeEvent.layout.height;
    if (h !== 0) {
      height.setValue(h);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOnPress}>{renderHeader(data.item)}</TouchableOpacity>
      <Animated.View style={{ width: '100%', height: transition, borderWidth: 1 }}>
        <View onLayout={handleOnLayout} style={{ width: '100%' }}>
          {renderContent(data.item)}
        </View>
      </Animated.View>
    </View>
  );
};

export default Item;
