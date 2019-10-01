import { emailRegex, zipRegex } from './regex';
import { compareAsc } from 'date-fns';

type ValidatorOutput = string | undefined;

const requiredValidator = (value: string): ValidatorOutput => {
  return value ? undefined : 'Required';
};
interface MinimumLengthOptions {
  minLength: number;
  message: string;
}

const minLengthValidator = (minOptions: MinimumLengthOptions, value: string): ValidatorOutput => {
  const { minLength, message } = minOptions;
  return value.length >= minLength ? undefined : message;
};

const emailValidator = (value: string): ValidatorOutput => {
  return emailRegex.test(value) ? undefined : 'Not a valid email';
};
const zipValidator = (value: string): ValidatorOutput => {
  return zipRegex.test(value) ? undefined : 'Not a valid zip code';
};
const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
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
const composeValidators = (...validators: Function[]) => (value: string | undefined): string | undefined => {
  return validators.reduce((error, validator) => error || validator(value), undefined);
};

export const formValidators = {
  requiredValidator,
  minLengthValidator,
  emailValidator,
  zipValidator,
  dateValidator,
  notPastDateValidator,
  composeValidators,
};
