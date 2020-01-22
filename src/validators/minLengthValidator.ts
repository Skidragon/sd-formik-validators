import { ValidatorOutput } from 'types';

interface IMinimumOptions {
  minLength: number;
  customMessage?: string;
}

const minLengthValidator = (minOptions: IMinimumOptions) => (value: string): ValidatorOutput => {
  const { minLength, customMessage } = minOptions;
  const msg = customMessage ? customMessage : `Field must have ${minLength} characters.`;
  return value.length >= minLength ? undefined : msg;
};
