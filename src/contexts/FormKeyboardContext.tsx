import React, { createContext, useState, useEffect } from 'react';
import { useKeyboard, IKeyboard } from '../hooks';

interface IContextProps extends IKeyboard {
  activeInput: number;
}

export const FormKeyboardContext = createContext<any>([{}, () => {}]);

const initState = {
  activeInput: 0,
};

export const FormKeyboardProvider = ({ children }: any) => {
  const keyboard = useKeyboard();
  const [state, setState] = useState<IContextProps>({...initState, ...keyboard });

  useEffect(() => {
    setState({ ...state, ...keyboard });
  }, [keyboard.isKeyboardShow]);

  return (
    <FormKeyboardContext.Provider value={[state, setState]}>
      {children}
    </FormKeyboardContext.Provider>
  );
};
