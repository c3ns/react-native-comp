import { useState } from 'react';
import validate from 'validate.js';
import forEach from 'lodash/forEach';

type OnChangeFunc = (name: string, text: string) => void;
type OnSubmitFunc = (callback: (forms: IForms) => void) => void;
type FormHook = (config: IProps) => IHookData;
type ValidateFormsFunc = (form: IForms) => IErrors;
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
  validateBeforeChange?: boolean;
  validation?: () => void | null;
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

  // initiate main validator
  const _validator = config.validation || validate;

  //
  const validateForms: ValidateFormsFunc = formValues => {
    const err: IErrors = {};
    const forms = formValues;
    // (config.validateOnChange || config.validateBeforeChange) && name ? { [name]: text } : values;

    // TODO find solution how to validate rePassword match when validation is on change

    // if (name === 'rePassword' && config.validateOnChange) {
    //   forms = { ...forms, password: values.password };
    // }

    const result: IValidateResult = _validator(forms, config.constraints);
    forEach(result, (value: string[], field: string) => {
      err[field] = value[0];
    });

    // if (name === 'rePassword' && config.validateOnChange) {
    //   const { password, ...rest } = err;
    //   err = rest;
    // }

    // if (config.validateOnChange) {
    //   const { [name]: omit, ...restErrors } = errors;
    //   const mErrors = err.hasOwnProperty(name) ? { ...errors, [name]: err[name] } : restErrors;
    //   err = mErrors;
    // }

    // if (name.length === 0) {
    //   setErrors(err);
    // }

    return err;
  };

  const _clearError: ClearErrorFunc = field => {
    const { [field]: omit, ...restErrors } = errors;
    setErrors(restErrors);
  };

  const validateOnChange = ({ name, text }: any) => {
    const err = validateForms({ [name]: text });
    setErrors(err);
    setValues({ ...values, [name]: text });
    // else if (values[name]) {
    //   console.log(values[name]);
    //   _clearError(name);
    // }

    // if (config.validateBeforeChange) {
    //   const err = validateForms(name, text);
    //   if (Object.keys(err).length === 0) {
    //     setValues({ ...values, [name]: text });
    //   }
    // }
  };

  const onChange: OnChangeFunc = (name, text) => {
    if (config.constraints && (config.validateOnChange || config.validateBeforeChange)) {
      validateOnChange({ name, text });
    } else {
      setValues({ ...values, [name]: text });
    }
  };

  const onSubmit: OnSubmitFunc = callback => {
    if (config.constraints) {
      const err = validateForms(values);
      if (Object.keys(err).length === 0) {
        callback(values);
      } else {
        setErrors(err);
      }
    } else {
      callback(values);
    }
  };

  return { values, onChange, errors, onSubmit };
};
