import { useState, useEffect } from 'react';
import validate from 'validate.js';
import forEach from 'lodash/forEach';

interface FormData<Values, ErrorProps> {
  values: Values;
  errors: ErrorProps;
  onChange: (key: keyof Values, text: string) => void;
  onSubmit: (action: Action<Values>) => void;
}

type Errors<Values> = { [K in keyof Values]?: string } | undefined;

type Action<Values> = (values: Values) => void;

interface Config {
  constraints?: any;
  initialValues?: any;
  validateOnChange?: boolean;
  validateBeforeChange?: boolean;
}

export const useForm = <Values>(config: Config): FormData<Values, Errors<Values>> => {
  const [values, setValues] = useState<Values>(config.initialValues || {});
  const [errors, setErrors] = useState<Errors<Values>>();

  useEffect(() => {
    if (config.initialValues) {
      setValues(config.initialValues);
    }
  }, []);

  const validateForms = () => {
    const err: Errors<Values> = {};

    const result = validate<Partial<Values>>(values, config.constraints);
    forEach(result, (value, field) => {
      if (value) {
        err[field] = value[0];
      }
    });

    return err;
  };

  const clearError = (field: keyof Values) => {
    if (errors && errors[field]) {
      delete errors[field];
      setErrors(errors);
    }
  };

  const onChange = (key: keyof Values, text: string) => {
    clearError(key);
    const newValues: Values = { ...values, [key]: text };
    if (text.length === 0) {
      delete newValues[key];
    }
    setValues(newValues);
  };

  const onSubmit = (action: Action<Values>) => {
    if (config.constraints) {
      const err = validateForms();
      if (Object.keys(err).length === 0) {
        action(values);
      } else {
        setErrors(err);
      }
    } else {
      action(values);
    }
  };

  return { values, onChange, errors, onSubmit };
};
