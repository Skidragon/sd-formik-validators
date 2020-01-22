import { ValidatorOutput } from 'types';

export const composeValidators = (...validators: any[]) => (value: string): ValidatorOutput => {
  return validators.reduce((error, validator) => error || validator(value), undefined);
};
