import { ValidatorOutput } from 'types';

export const dateValidator = (value: Date): ValidatorOutput => {
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
