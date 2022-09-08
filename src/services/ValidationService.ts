interface IField {
  value: string | number;
  required: boolean;
  rules: string[];
  compareValue?: string | number;
}

interface IFieldForm {
  value: string;
  error: string;
  required: boolean;
  validationRules: string[];
  compareValue: '';
}

class ValidationApiService {
  public validateName(value: string) {
    const isValid = Boolean(value?.length > 1);

    return {
      valid: isValid,
      errorMessage: isValid ? '' : 'Username should be more than 1',
    };
  }

  public validateEmail(value: string) {
    const reg =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValid = reg.test(String(value).toLowerCase());
    return {
      valid: isValid,
      errorMessage: isValid ? '' : 'Invalid email',
    };
  }
  public validatePassword(value: string) {
    const isValid = value?.length > 7;
    return {
      valid: Boolean(isValid),
      errorMessage: isValid ? '' : 'Password should be more than 7',
    };
  }

  public validateConfirmPassword(confirmPassword: string, password?: string) {
    // console.log({ confirmPassword, password });
    const isValid = Boolean(confirmPassword?.trim() === password?.trim());

    return {
      valid: isValid,
      errorMessage: isValid ? '' : 'Passwords do not match',
    };
  }

  public getValidatorByRule(rule: string) {
    switch (rule) {
      case 'email':
        return this.validateEmail;
      // break;
      case 'username':
        return this.validateName;
      // break;
      case 'password':
        return this.validatePassword;
      // break;
      case 'confirmPassword':
        return this.validateConfirmPassword;
      // break;
      default:
        return this.validateName;
    }
  }

  public checkField({ rules, value, compareValue, required }: IField) {
    const errors = rules.map((rule) => {
      if (typeof value === 'number') {
        return '';
      }

      if (typeof value === 'string') {
        if (!required && !value.length) {
          return '';
        }

        const func = this.getValidatorByRule(rule);

        if (compareValue) {
          return func(value, compareValue as string).errorMessage;
        }

        if (!compareValue) {
          return func(value).errorMessage;
        }
      }
    });
    return errors.filter((message) => message !== '').join('. ');
  }

  public checkObject(fieldsObject: any) {
    const fields = Object.values(fieldsObject) as IFieldForm[];

    const errors = fields.reduce((acc, { value, compareValue, required, validationRules }: IFieldForm) => {
      const res = this.checkField({
        rules: validationRules,
        required,
        value,
        compareValue: compareValue ? fieldsObject[compareValue]?.value : undefined,
      });
      return res.length ? [...acc, res] : acc;
    }, [] as string[]);

    return Boolean(!errors.length);
  }
}

export const ValidationService = new ValidationApiService();
