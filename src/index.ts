import { compareAsc } from 'date-fns';
import { emailRegex, zipRegex } from './regex';

type ValidatorOutput = string | undefined;

const composeValidators = (...validators: any[]) => (value: string | undefined): string | undefined => {
  return validators.reduce((error, validator) => error || validator(value), undefined);
};

const dateValidator = (value: Date): ValidatorOutput => {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    if (isNaN(value.getTime())) {
      return 'Invalid Date';
    } else {
      return undefined;
    }
  } else {
    return 'Invalid Date';
  }
};

const emailValidator = (value: string): ValidatorOutput => {
  return emailRegex.test(value) ? undefined : 'Not a valid email';
};

interface IMinimumOptions {
  minLength: number;
  customMessage?: string | undefined;
}
const minLengthValidator = (minOptions: IMinimumOptions, value: string): ValidatorOutput => {
  const { minLength, customMessage } = minOptions;
  const msg = customMessage ? customMessage : `Field must have ${minLength} characters.`;
  return value.length >= minLength ? undefined : msg;
};

const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

const notPastDateValidator = (value: Date): ValidatorOutput => {
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
};

const requiredValidator = (value: string): ValidatorOutput => {
  return value ? undefined : 'Required';
};

const zipValidator = (value: string): ValidatorOutput => {
  return zipRegex.test(value) ? undefined : 'Not a valid zip code';
};

export {
  composeValidators,
  dateValidator,
  emailValidator,
  minLengthValidator,
  notPastDateValidator,
  requiredValidator,
  zipValidator,
};
