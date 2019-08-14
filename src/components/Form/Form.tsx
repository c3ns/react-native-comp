import React, { useEffect, useState, useRef } from 'react';
import { View, ViewStyle, TextInputProps, Keyboard } from 'react-native';

interface IFormProps {
  children: React.ReactElement[];
  style?: ViewStyle;
}

interface IExtendedProps extends TextInputProps {}

type ActiveInptutFunc = () => void;
type OnFocusFunc = (index: number) => void;
type CloneChildFunc = (child: React.ReactElement , index: number, enchance: boolean) => React.ReactElement;
type ModifyChildrensFunc = (child: React.ReactElement, i: number) => React.ReactElement;

export const Form: React.FC<IFormProps> = ({ children, style }) => {
  const [activeInput, setActicveInput] = useState<number>(0);
  const inputRef = useRef();

  useEffect(() => {
    extendedChildrens[activeInput].ref.current.focus();
  }, [activeInput]);

  const _handleActiveInput: ActiveInptutFunc = () => {
    if (activeInput !== children.length - 1 && children.length) {
      setActicveInput(activeInput + 1);
    }
  };

  const _handleOnFocus: OnFocusFunc = (index) => {
    if (activeInput !== index) {
      Keyboard.dismiss();
      setActicveInput(index);
    }
  };

  const _cloneChildren: CloneChildFunc = (child, index, enchance) => {
    const extendedProps: IExtendedProps = {
      onSubmitEditing: _handleActiveInput,
      onFocus: () => _handleOnFocus(index),
      ref: enchance ? inputRef : null,
      ...child.props,
    };
    return React.cloneElement(child, extendedProps);
  };
  
  const modifyChildrens: ModifyChildrensFunc = (child, i) => {
    
    if (i === activeInput) {
      return _cloneChildren(child, activeInput, true);
    } else {
      return _cloneChildren(child, i, false);
    }
  };

  const extendedChildrens: any = React.Children.map(children, modifyChildrens);

  return (
    <View style={style}>
      {extendedChildrens}
    </View>
  );
};