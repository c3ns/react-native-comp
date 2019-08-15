import React, { useEffect, useRef, useContext } from 'react';
import { View, ViewStyle, TextInputProps } from 'react-native';
import { FormKeyboardContext } from '../../contexts/FormKeyboardContext';

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
  const [state, setState] = useContext(FormKeyboardContext);
  const inputRef = useRef();

  useEffect(() => {
    extendedChildrens[state.activeInput].ref.current.focus();
  }, [state.activeInput]);

  const _handleActiveInput: ActiveInptutFunc = () => {
    if (state.activeInput !== children.length - 1 && children.length) {
      setState({...state, activeInput: state.activeInput + 1 });
    }
  };

  const _handleOnFocus: OnFocusFunc = (index) => {
    if (state.activeInput !== index) {
      setState({...state, activeInput: index });
    }
  };

  const _cloneChildren: CloneChildFunc = (child, index, enchance) => {
    const isLast = index === children.length - 1;
    const extendedProps: IExtendedProps = {
      onSubmitEditing: _handleActiveInput,
      onFocus: () => _handleOnFocus(index),
      blurOnSubmit: isLast,
      ref: enchance ? inputRef : null,
      ...child.props,
    };
    return React.cloneElement(child, extendedProps);
  };
  
  const modifyChildrens: ModifyChildrensFunc = (child, i) => {
    if (i === state.activeInput) {
      return _cloneChildren(child, state.activeInput, true);
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

Form.defaultProps = {
  style: {
    width: '100%',
  }
};