import { formValidators } from '../';

//It is a valid value when validator returns undefined.

//It is not a valid value when validator returns an error string.
describe('Testing formValidators', () => {
  it('requiredValidator', () => {
    const { requiredValidator } = formValidators;
    expect(requiredValidator('a')).toBeUndefined();
    //Returns an error
    expect(requiredValidator('')).toBeTruthy();
  });
  it('minLengthValidator', () => {
    const { minLengthValidator } = formValidators;
    const minValidator = minLengthValidator.bind(null, {
      minLength: 6,
      message: `It must be 6 characters`,
    });
    expect(minValidator('abc')).toBeTruthy();
    expect(minValidator('abcde')).toBeTruthy();

    expect(minValidator('abcdef')).toBeUndefined();
    expect(minValidator('abcdefgh')).toBeUndefined();
  });
  it('emailValidator', () => {
    const { emailValidator } = formValidators;
    expect(emailValidator('daviss@gottlieb.com')).toBeUndefined();
    expect(emailValidator('s@gmail.co')).toBeUndefined();

    expect(emailValidator('@gmail.co')).toBeTruthy();
    expect(emailValidator('simongmail.co')).toBeTruthy();
    expect(emailValidator('davis@gottlieb')).toBeTruthy();
  });
  it('zipValidator', () => {
    const { zipValidator } = formValidators;
    expect(zipValidator('12345')).toBeUndefined();
    expect(zipValidator('12345-6789')).toBeUndefined();

    expect(zipValidator('abc')).toBeTruthy();
    expect(zipValidator('1234')).toBeTruthy();
    expect(zipValidator('12345-67')).toBeTruthy();
    expect(zipValidator('1-')).toBeTruthy();
  });
  it('dateValidator', () => {
    const { dateValidator } = formValidators;

    expect(dateValidator(new Date())).toBeUndefined();

    expect(dateValidator(new Date('a'))).toBeTruthy();
  });
  it('notPastDateValidator', () => {
    const { notPastDateValidator } = formValidators;
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
  });
});
