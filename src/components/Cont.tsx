import React from 'react';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
// import { onScroll } from 'react-native-redash';
import range from 'lodash/range';

const Cont = ({ y, onScroll }) => {
  const listItems = range(7);
  return (
    <Container
      // onScroll={onScroll({ y })}
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      {listItems.map(item => (
        <Item key={item} />
      ))}
    </Container>
  );
};

export default Cont;

const Container = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 80,
  },
})`
  flex: 1;
  width: 100%;
  /* padding: 20px; */
  background-color: #dddddd;
`;

const Item = styled.View`
  width: 100%;
  height: 150px;
  margin: 20px 0;
  background-color: white;
`;
