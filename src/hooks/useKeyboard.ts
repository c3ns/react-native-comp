import { useEffect, useState } from 'react';
import { Keyboard, EmitterSubscription, KeyboardEvent } from 'react-native';

type KeyboardWillShowFunc = (event: KeyboardEvent) => void;
type KeyboardWillHideFunc = (event: KeyboardEvent) => void;

export interface IKeyboard {
  isKeyboardShow: boolean;
  keyboardHeight: number;
}

const initial = {
  isKeyboardShow: false,
  keyboardHeight: 0,
};

let keyboardWillShowListener: EmitterSubscription;
let keyboardWillHideListener: EmitterSubscription;

export const useKeyboard = () => {
  const [keyboard, setKeyboard] = useState<IKeyboard>(initial);

  const keyboardWillShow: KeyboardWillShowFunc = e => {
    setKeyboard({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height,
    });
  };

  const keyboardWillHide: KeyboardWillHideFunc = e => {
    setKeyboard({
      isKeyboardShow: false,
      keyboardHeight: e.endCoordinates.height,
    });
  };

  useEffect(() => {
    keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return keyboard;
};
