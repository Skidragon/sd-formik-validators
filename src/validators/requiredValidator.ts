import { ValidatorOutput } from 'types';

export const requiredValidator = (value: string): ValidatorOutput => {
  return value ? undefined : 'Required';
};
