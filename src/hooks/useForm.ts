import { useState } from 'react';
import validate from 'validate.js';
import forEach from 'lodash/forEach';

type OnChangeProps = (name: string, text: string) => void;
type OnSubmitProps = (callback: (forms: IForms) => void) => void;
type FormHook = (config: IProps) => IHookData;

interface IHookData {
  values: IForms;
  errors: IErrors;
  onChange: OnChangeProps;
  onSubmit: OnSubmitProps;
}

interface IProps {
  constraints: any;
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

export const useForm: FormHook = (config) => {
  const [values, setValues] = useState<IForms>({});
  const [errors, setErrors] = useState<IErrors>({});

  const _validateForms = () => {
    const err: IErrors = {};
    const result: IValidateResult = validate(values, config.constraints);
    forEach(result, (value: string[], field: string) => {
      err[field] = value[0];
    });
    setErrors(err);
  };

  const _clearError = (field: string) => {
    const { [field]: omit, ...restErrors } = errors;
    setErrors(restErrors);
  };

  const onChange: OnChangeProps = (name, text) => {
    if (errors[name]) {
      _clearError(name);
    }
    setValues(({ ...values, [name]: text }));
  };

  const onSubmit: OnSubmitProps = (callback) => {
    if (config.constraints) {
      _validateForms();
    }
    callback(values);
  };

  return { values, onChange, errors, onSubmit };
};