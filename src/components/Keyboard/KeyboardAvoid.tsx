import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Dimensions,
  TextInput,
  UIManager,
  Animated,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { FormKeyboardContext } from '../../contexts/FormKeyboardContext';

type ScrollUpFunc = () => void;
type ScrollDownFunc = (focusedField: any) => void;
type ContainerHeightFunc = (x: number, y: number) => void;

const { height: windowHeight } = Dimensions.get('window');
const { State: TextInputState } = TextInput;

export const KeyboardAvoid = ({ children, style }: any) => {
  const scrollViewRef = useRef<ScrollView>({});
  const [state] = useContext(FormKeyboardContext);
  const [shift] = useState(new Animated.Value(0));
  const [flexData] = useState(new Animated.Value(1));
  const [fullHeight, setFullHeight] = useState<number>(0);

  useEffect(() => {
    const focusedField = TextInputState.currentlyFocusedField();
    if (state.isKeyboardShow && focusedField) {
      _scrollDown(focusedField);
    } else {
      _scrollUp();
    }
  });

  useEffect(() => {
    _animateFlex();
  }, [state.isKeyboardShow]);

  const _scrollDown: ScrollDownFunc = field => {
    UIManager.measure(field, (x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = windowHeight - state.keyboardHeight - (fieldTop + fieldHeight);
      console.log(fieldTop);
      if (gap >= 0 || -gap >= state.keyboardHeight) {
        return;
      }

      const top = fieldTop + fieldHeight < windowHeight;

      scrollViewRef.current.getNode().scrollTo({ x: 0, y: 0, animated: true });

      // Animated.timing(
      //   shift,
      //   {
      //     toValue: gap,
      //     duration: 300,
      //     useNativeDriver: true,
      //   }
      // ).start();
    });
  };

  const _scrollUp: ScrollUpFunc = () => {
    // Animated.timing(
    //   shift,
    //   {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }
    // ).start();
  };

  const _animateFlex = () => {
    // const gap = state.isKeyboardShow ? 0.6 : 1;
    Animated.timing(flexData, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleContainerHeight: ContainerHeightFunc = (x, y) => {
    setFullHeight(y);
  };

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      onContentSizeChange={handleContainerHeight}
      // contentContainerStyle={{flex: flexData}}
      style={[styles.container, { transform: [{ translateY: shift }] }]}
    >
      <Animated.View style={[style, { flex: flexData }]}>{children}</Animated.View>
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
    width: '100%',
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight,
  },
});
