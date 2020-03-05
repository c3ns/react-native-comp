import React, { useEffect, useRef, useState } from 'react';
import { View, ViewStyle, TextInput, TextInputProps } from 'react-native';
import { useMemoOne } from 'use-memo-one';

interface IFormProps {
  children: React.ReactElement[] | React.ReactElement;
  style?: ViewStyle;
}

type ExtendedProps = TextInputProps & {
  ref: React.RefObject<TextInput> | null;
};

const KeyboardManager: React.FC<IFormProps> = ({ children, style }) => {
  const [activeInput, setActiveInput] = useState(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // @ts-ignore
    extendedChildrens[activeInput].ref.current.focus();
  }, [activeInput]);

  const _handleActiveInput = () => {
    if (Array.isArray(children) && activeInput !== children.length - 1) {
      setActiveInput(activeInput + 1);
    }
  };

  const _handleOnFocus = (index: number) => () => {
    if (activeInput !== index) {
      setActiveInput(index);
    }
  };

  const modifyChildrens = (child: React.ReactElement, i: number) => {
    const getIsLast = () => {
      if (Array.isArray(children)) {
        return i === children.length - 1;
      } else {
        return true;
      }
    };

    const currentActive = i === activeInput;

    const extendedProps: ExtendedProps = {
      onSubmitEditing: _handleActiveInput,
      onFocus: _handleOnFocus(i),
      blurOnSubmit: getIsLast(),
      ref: currentActive ? inputRef : null,
    };

    return React.cloneElement<ExtendedProps>(child, extendedProps);
  };

  const extendedChildrens = useMemoOne(() => React.Children.map(children, modifyChildrens), [
    activeInput,
  ]);

  return <View style={style}>{extendedChildrens}</View>;
};

export default KeyboardManager;

KeyboardManager.defaultProps = {
  style: {
    width: '100%',
  },
};
