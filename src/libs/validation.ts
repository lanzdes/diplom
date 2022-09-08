export const validateName = (name: string) => name.length > 1;
export const validateEmail = (email: string) => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return reg.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => password.trim().length > 7;

export const validateConfirmPassword = (password: string, confirmPassword: string) =>
  confirmPassword.trim().length > 7 && confirmPassword.trim() === password.trim();
