import { compareAsc, isValid } from 'date-fns';
import { emailRegex, zipRegex } from './regex';

type ValidatorOutput = string | undefined;

const composeValidators = (...validators: any[]) => (value: string | undefined): string | undefined => {
  return validators.reduce((error, validator) => error || validator(value), undefined);
};
// https://stackoverflow.com/questions/54443161/parse-and-format-date-in-string/54443608
const dateValidator = (value: Date | null | ''): ValidatorOutput => {
  if (value) {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      if (isNaN(value.getTime())) {
        return 'Invalid Date';
      } else {
        return undefined;
      }
    } else {
      return 'Invalid Date';
    }
  } else {
    return undefined;
  }
};
interface IMinimumDateOptions {
  minDate: Date;
  customMessage?: string | undefined;
}
const minDateValidator = (minDateOptions: IMinimumDateOptions) => (value: Date | null | ''): ValidatorOutput => {
  const { minDate, customMessage } = minDateOptions;
  const msg = customMessage ? customMessage : `Date must be greater than minimum date.`;
  if (value instanceof Date) {
    return compareAsc(minDate, value) === 1 ? msg : undefined;
  } else if (typeof value === 'string') {
    return compareAsc(minDate, new Date(value)) === 1 ? msg : undefined;
  } else {
    return undefined;
  }
};
interface IMaxDateOptions {
  maxDate: Date;
  customMessage?: string | undefined;
}
const maxDateValidator = (maxDateOptions: IMaxDateOptions) => (value: Date | null | ''): ValidatorOutput => {
  const { maxDate, customMessage } = maxDateOptions;
  const msg = customMessage ? customMessage : `Date must be greater than max date.`;
  if (value instanceof Date) {
    return compareAsc(maxDate, value) === -1 ? msg : undefined;
  } else if (typeof value === 'string') {
    return compareAsc(maxDate, new Date(value)) === -1 ? msg : undefined;
  } else {
    return undefined;
  }
};
const emailValidator = (value: string): ValidatorOutput => {
  if (value === '') {
    return undefined;
  }
  return emailRegex.test(value) ? undefined : 'Not a valid email';
};

const honeypotValidator = (value: string) => {
  return !value ? undefined : ' ';
};
interface IMinimumOptions {
  minLength: number;
  customMessage?: string | undefined;
}
const minLengthValidator = (minOptions: IMinimumOptions) => (value: string): ValidatorOutput => {
  if (!value) {
    return undefined;
  }
  const { minLength, customMessage } = minOptions;
  const msg = customMessage ? customMessage : `Field must have ${minLength} characters.`;
  return value.length >= minLength ? undefined : msg;
};

const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

const notPastDateValidator = (value: Date | null | ''): ValidatorOutput => {
  if (value) {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      if (isNaN(value.getTime())) {
        return 'Invalid Date';
      } else {
        if (isSameDay(new Date(), value) || compareAsc(value, new Date()) === 1) {
          return undefined;
        } else {
          return 'Date cannot be in the past.';
        }
      }
    } else {
      return 'Invalid Date';
    }
  }
};
interface IRegexOptions {
  message: string;
  regex: RegExp;
}
const regexValidator = (regexOptions: IRegexOptions) => (value: string) => {
  const { regex, message } = regexOptions;
  return regex.test(value) ? undefined : message;
};

const requiredValidator = (value: string): ValidatorOutput => {
  return value ? undefined : 'Required';
};

const stringDateValidator = ({
  message = 'Invalid Date',
  inputMaskToIgnore = '__/__/____',
}: {
  message: string;
  inputMaskToIgnore: string;
}) => (value: ValidatorOutput) => {
  if (!value || value === inputMaskToIgnore) {
    return undefined;
  }
  return isValid(new Date(value)) ? undefined : message;
};

const zipValidator = (value: string): ValidatorOutput => {
  if (value === '') {
    return undefined;
  }
  return zipRegex.test(value) ? undefined : 'Not a valid zip code';
};

export {
  composeValidators,
  dateValidator,
  emailValidator,
  honeypotValidator,
  maxDateValidator,
  minDateValidator,
  minLengthValidator,
  notPastDateValidator,
  regexValidator,
  requiredValidator,
  stringDateValidator,
  zipValidator,
};
