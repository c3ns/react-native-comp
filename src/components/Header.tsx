import React, { useState } from 'react';
import styled from 'styled-components';
import Animated, { Easing } from 'react-native-reanimated';
import { useToggle } from 'react-native-redash';

const { useCode, interpolate, cond, call, lessThan } = Animated;

const Header = ({ y }) => {
  const [state, setState] = useState(false);
  const toggle = useToggle(state, 400, Easing.in(Easing.ease));

  useCode(
    () => cond(lessThan(y, 200), call([], () => setState(false)), call([], () => setState(true))),
    [],
  );

  console.log('rerender');

  const transition = interpolate(toggle, {
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  return <Cont style={{ top: transition }} />;
};

export default Header;

const Cont = styled(Animated.View)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: green;
  z-index: 2;
`;
