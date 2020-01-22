import {
  dateValidator,
  emailValidator,
  honeypotValidator,
  minLengthValidator,
  notPastDateValidator,
  regexValidator,
  requiredValidator,
  stringDateValidator,
  zipValidator,
} from '../';

//It is a valid value when validator returns undefined.

//It is not a valid value when validator returns an error string.
describe('Testing formValidators', () => {
  it('honeypotValidator', () => {
    expect(honeypotValidator('')).toBeUndefined();
    expect(honeypotValidator('abc')).toBe(' ');
    expect(honeypotValidator('a')).toBe(' ');
  });
  it('regexValidator', () => {
    const validator = regexValidator({
      message: 'Invalid message',
      regex: /messages?/,
    });
    expect(validator('messages')).toBeUndefined();
    expect(validator('message')).toBeUndefined();

    expect(validator('Im a bad msg')).toBeTruthy();
  });

  it('requiredValidator', () => {
    expect(requiredValidator('a')).toBeUndefined();
    //Returns an error
    expect(requiredValidator('')).toBeTruthy();
  });

  it('stringDateValidator', () => {
    const validator = stringDateValidator({
      message: 'Invalid Date.',
      inputMaskToIgnore: '__/__/____',
    });
    expect(validator('__/__/____')).toBeUndefined();
    expect(validator('02/32/2019')).toBe('Invalid Date.');
    expect(validator('02/__/____')).toBe('Invalid Date.');
    expect(validator('13/24/2019')).toBe('Invalid Date.');

    const validator2 = stringDateValidator({
      message: 'Invalid Date!!!',
      inputMaskToIgnore: '__-__-____',
    });
    expect(validator2('02-24-2000')).toBeUndefined();
    expect(validator2('__-__-____')).toBeUndefined();
    expect(validator2('02-00-2024')).toBe('Invalid Date!!!');
    expect(validator2('__/__/____')).toBe('Invalid Date!!!');
  });

  it('minLengthValidator', () => {
    const minValidator = minLengthValidator({
      minLength: 6,
      customMessage: `It must be 6 characters`,
    });
    expect(minValidator('abc')).toBeTruthy();
    expect(minValidator('abcde')).toBeTruthy();

    expect(minValidator('')).toBeUndefined();
    expect(minValidator('abcdef')).toBeUndefined();
    expect(minValidator('abcdefgh')).toBeUndefined();
  });
  it('emailValidator', () => {
    expect(emailValidator('')).toBeUndefined();
    expect(emailValidator('daviss@gottlieb.com')).toBeUndefined();
    expect(emailValidator('s@gmail.co')).toBeUndefined();

    expect(emailValidator('@gmail.co')).toBeTruthy();
    expect(emailValidator('simongmail.co')).toBeTruthy();
    expect(emailValidator('davis@gottlieb')).toBeTruthy();
  });
  it('zipValidator', () => {
    expect(zipValidator('')).toBeUndefined();
    expect(zipValidator('12345')).toBeUndefined();
    expect(zipValidator('12345-6789')).toBeUndefined();

    expect(zipValidator('abc')).toBeTruthy();
    expect(zipValidator('1234')).toBeTruthy();
    expect(zipValidator('12345-67')).toBeTruthy();
    expect(zipValidator('1-')).toBeTruthy();
  });
  it('dateValidator', () => {
    expect(dateValidator('')).toBeUndefined();
    expect(dateValidator(new Date())).toBeUndefined();

    expect(dateValidator(new Date('a'))).toBeTruthy();
  });
  it('notPastDateValidator', () => {
    // Testing Future dates
    //----------------------------
    const future = new Date();
    future.setDate(future.getDate() + 1);
    expect(notPastDateValidator(future)).toBeUndefined();
    // Testing Present date
    //---------------------------
    const present = new Date();

    expect(notPastDateValidator(present)).toBeUndefined();
    // Testing Past dates
    //---------------------------
    const past = new Date();
    past.setDate(past.getDate() - 1);

    expect(notPastDateValidator(new Date(past))).toBeTruthy();
    past.setDate(past.getDate() - 200);
    expect(notPastDateValidator(new Date(past))).toBeTruthy();

    // Testing falsy values
    expect(notPastDateValidator('')).toBeUndefined();
  });
});
