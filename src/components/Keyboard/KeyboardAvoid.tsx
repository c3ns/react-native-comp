import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
  Dimensions, 
  TextInput, 
  UIManager, 
  Animated, 
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FormKeyboardContext } from '../../contexts/FormKeyboardContext';

type ScrollUpFunc = () => void;
type ScrollDownFunc = (focusedField: any) => void;
// type ContainerHeightFunc = (x: number, y: number) => void;

const { height: windowHeight } = Dimensions.get('window');
const { State: TextInputState } = TextInput;

export const KeyboardAvoid = ({ children, style }: any) => {
  const scrollViewRef = useRef<ScrollView>({});
  const [state] = useContext(FormKeyboardContext);
  const [shift] = useState(new Animated.Value(0));
  // const [fullHeight, setFullHeight] = useState(1);
  // const [focusedField, setFocusedField] = useState(0);

  // useEffect(() => {
  //   const asd = TextInputState.currentlyFocusedField();
  //   console.log(asd)
  //   setFocusedField(asd);
  // });

  useEffect(() => {
    const focusedField = TextInputState.currentlyFocusedField();
    if (state.isKeyboardShow && focusedField) {
      _scrollDown(focusedField);
    } else {
      _scrollUp();
    }
  });

  const _scrollDown: ScrollDownFunc = (field) => {
    UIManager.measure(field, (x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - state.keyboardHeight) - (fieldTop + fieldHeight);
      // console.log(gap)
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        shift,
        {
          toValue: gap - 50,
          duration: 300,
          useNativeDriver: true,
        }
      ).start();
    });
  };

  const _scrollUp: ScrollUpFunc = () => {
    Animated.timing(
      shift,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  };

  // const handleContainerHeight: ContainerHeightFunc = (x, y) => {
  //   setFullHeight(y);
  // };

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      // keyboardDismissMode={true}
      // onContentSizeChange={handleContainerHeight}
      contentContainerStyle={style}
      style={[styles.container, { transform: [{translateY: shift}] }]} 
    >
      {children}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight,
  }
});