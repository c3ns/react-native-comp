import React, { useEffect, useState, useRef } from 'react';
import { 
  Keyboard, 
  Dimensions, 
  TextInput, 
  EmitterSubscription, 
  UIManager, 
  Animated, 
  StyleSheet,
  ScrollView,
  KeyboardEvent,
} from 'react-native';

type ScrollUpFunc = () => void;
type ScrollDownFunc = () => void;
type KeyboardWillShowFunc = (event: KeyboardEvent) => void;
type KeyboardWillHideFunc = (event: KeyboardEvent) => void;
type ContainerHeightFunc = (x: number, y: number) => void;

const { height: windowHeight } = Dimensions.get('window');
const { State: TextInputState } = TextInput;

export const KeyboardAvoid = ({ children }: any) => {
  const scrollViewRef = useRef<ScrollView>({});
  const [shift] = useState(new Animated.Value(0));
  const [fullHeight, setFullHeight] = useState(1);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  let keyboardWillShowSub: EmitterSubscription;
  let keyboardWillHideSub: EmitterSubscription;

  useEffect(() => {
    keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
    keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);
    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (isKeyboardShow) {
      _scrollDown();
    } else {
      _scrollUp();
    }
  }, [isKeyboardShow]);

  const _scrollDown: ScrollDownFunc = () => {
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    if (currentlyFocusedField) {
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        const delta = (windowHeight - 200) < pageY ? (fullHeight - windowHeight) / 2 : 0;
        scrollViewRef.current.getNode().scrollTo({x: 0, y: pageY / 3 });
        Animated.timing(
          shift,
          {
            toValue: gap - delta,
            duration: 300,
            useNativeDriver: true,
          }
        ).start();
      });
    }
  };

  const _scrollUp: ScrollUpFunc = () => {
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    if (!currentlyFocusedField ) {
      Animated.timing(
        shift,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }
      ).start();
    }
  };

  const handleKeyboardWillShow: KeyboardWillShowFunc = (event: any) => {
    if (keyboardHeight === 0) {
      const height = event.endCoordinates.height;
      setKeyboardHeight(height);
    }
    setIsKeyboardShow(true);
  };

  const handleKeyboardWillHide: KeyboardWillHideFunc = () => {
    setIsKeyboardShow(false);
  };

  const handleContainerHeight: ContainerHeightFunc = (x, y) => {
    setFullHeight(y);
  };

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      // keyboardDismissMode={true}
      onContentSizeChange={handleContainerHeight}
      contentContainerStyle={styles.content}
      style={[styles.container, { transform: [{translateY: shift}] }]} 
    >
      {children}
    </Animated.ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gray',
    flex: 1,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  content: {
    justifyContent: 'space-around',
  }
});