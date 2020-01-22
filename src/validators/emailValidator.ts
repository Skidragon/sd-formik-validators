import { emailRegex } from 'regex';
import { ValidatorOutput } from 'types';

export const emailValidator = (value: string): ValidatorOutput => {
  if (value === '') {
    return undefined;
  }
  return emailRegex.test(value) ? undefined : 'Not a valid email';
};
