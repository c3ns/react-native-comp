const constraints = {
  email: {
    presence: { message: '^emptyEmail' },
    format: {
      pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}',
      message: '^invalidEmail',
    },
  },
  name: {
    presence: { message: '^emptyName' },
    length: {
      minimum: 2,
      maximum: 50,
      message: '^incorectName',
    },
  },
};

export const config = {
  constraints,
  validateOnChange: false,
};
