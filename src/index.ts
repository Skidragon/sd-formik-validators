import { compareAsc, isValid } from 'date-fns';
import { emailRegex, zipRegex } from './regex';
import { ValidatorOutput } from 'types';

const honeypotValidator = (value: string) => {
  return !value ? undefined : ' ';
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

export {
  composeValidators,
  dateValidator,
  emailValidator,
  honeypotValidator,
  minLengthValidator,
  notPastDateValidator,
  regexValidator,
  requiredValidator,
  stringDateValidator,
  zipValidator,
};
