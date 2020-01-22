import { ValidatorOutput } from 'types';
import { zipRegex } from 'regex';

export const zipValidator = (value: string): ValidatorOutput => {
  if (value === '') {
    return undefined;
  }
  return zipRegex.test(value) ? undefined : 'Not a valid zip code';
};
