interface IRegexOptions {
  message: string;
  regex: RegExp;
}
export const regexValidator = (regexOptions: IRegexOptions) => (value: string) => {
  const { regex, message } = regexOptions;
  return regex.test(value) ? undefined : message;
};
