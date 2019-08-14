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
  View
} from 'react-native';

const { height: windowHeight } = Dimensions.get('window');
const { State: TextInputState } = TextInput;

export const KeyboardAvoid = ({ children }: any) => {
  const scrollViewRef = useRef<ScrollView>({});
  const [shift] = useState(new Animated.Value(0));
  const [fullHeight, setFullHeight] = useState(1);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  let keyboardDidShowSub: EmitterSubscription;
  let keyboardDidHideSub: EmitterSubscription;

  useEffect(() => {
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  useEffect(() => {
      

    if (isKeyboardShow) {
      // scrollViewRef.current.getNode().scrollTo({x: 0, y: 500});
      scrollDown();
    } else {
      scrollUp();
    }
  }, [isKeyboardShow]);

  const scrollDown = () => {
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    if (currentlyFocusedField) {
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        const delta = fullHeight === 0 ? 50 : fullHeight;
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

  const scrollUp = () => {
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

  const handleKeyboardDidShow = (event: any) => {
    if (keyboardHeight === 0) {
      const height = event.endCoordinates.height;
      setKeyboardHeight(height);
    }
    setIsKeyboardShow(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardShow(false);
    
  };

  const handleScreenHeight = ({ nativeEvent }) => {
    
    // console.log(nativeEvent.contentOffset.y)
    setFullHeight(nativeEvent.contentOffset.y);
  };

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      // keyboardDismissMode={true}
      // onContentSizeChange={(x,y) => setFullHeight(y)}
      // scrollTo=
      onScroll={handleScreenHeight}
      contentContainerStyle={styles.content}
      style={[styles.container, { transform: [{translateY: shift}] }]} 
    >
      {children}
      {/* <TextInput/> */}
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