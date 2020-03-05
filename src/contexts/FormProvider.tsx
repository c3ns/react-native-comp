import React, { createContext, useState, useEffect } from 'react';
import { useKeyboard, IKeyboard } from '../hooks';

export const FormContext = createContext<any>([{}, () => {}]);

export const FormProvider = ({ children }: any) => {
  return <FormContext.Provider value={{}}>{children}</FormContext.Provider>;
};
