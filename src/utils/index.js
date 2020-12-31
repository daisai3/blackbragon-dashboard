export const validateEmail = (email) => {
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const validateStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (password) => {
  // eslint-disable-next-line
  const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return phoneNumberRegex.test(password);
};

export const validatePassword = (password, confirmPassword) => {
  const errors = { count: true, uppercase: true, lowercase: true, number: true, matched: true };
  if (password.length >= 8) errors.count = false;
  if (/[A-Z]/.test(password)) errors.uppercase = false;
  if (/[a-z]/.test(password)) errors.lowercase = false;
  if (/\d/.test(password)) errors.number = false;
  if (password.length > 0 && password === confirmPassword) errors.matched = false;
  return errors;
};
