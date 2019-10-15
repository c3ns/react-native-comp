import { useState } from 'react';
import validate from 'validate.js';
import forEach from 'lodash/forEach';

type OnChangeFunc = (name: string, text: string) => void;
type OnSubmitFunc = (callback: (forms: IForms) => void) => void;
type FormHook = (config: IProps) => IHookData;
type ValidateFormsFunc = (name?: string, text?: string) => void;
type ClearErrorFunc = (field: string) => void;

interface IHookData {
  values: IForms;
  errors: IErrors;
  onChange: OnChangeFunc;
  onSubmit: OnSubmitFunc;
}

interface IProps {
  constraints?: any;
  validateOnChange?: boolean;
}

interface IValidateResult {
  [field: string]: string[];
}

export interface IForms {
  [field: string]: string;
}

export interface IErrors {
  [field: string]: string;
}

export const useForm: FormHook = config => {
  const [values, setValues] = useState<IForms>({});
  const [errors, setErrors] = useState<IErrors>({});

  const _validateForms: ValidateFormsFunc = (name = '', text = '') => {
    const err: IErrors = {};
    const forms = config.validateOnChange ? { [name]: text } : values;
    const result: IValidateResult = validate(forms, config.constraints);
    forEach(result, (value: string[], field: string) => {
      err[field] = value[0];
    });

    if (config.validateOnChange) {
      const { [name]: omit, ...restErrors } = errors;
      const mErrors = err.hasOwnProperty(name) ? { ...errors, [name]: err[name] } : restErrors;
      setErrors(mErrors);
    } else {
      setErrors(err);
    }
  };

  const _clearError: ClearErrorFunc = field => {
    const { [field]: omit, ...restErrors } = errors;
    setErrors(restErrors);
  };

  const onChange: OnChangeFunc = (name, text) => {
    if (config.validateOnChange && config.constraints) {
      _validateForms(name, text);
    } else if (errors[name]) {
      _clearError(name);
    }
    setValues({ ...values, [name]: text });
  };

  const onSubmit: OnSubmitFunc = callback => {
    if (config.constraints) {
      _validateForms();
    }
    callback(values);
  };

  return { values, onChange, errors, onSubmit };
};
