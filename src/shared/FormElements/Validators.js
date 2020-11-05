const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_USERNAME = "USERNAME";
const VALIDATOR_TYPE_DISPLAYNAME = "DISPLAYNAME";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_PASSWORD = "PASSWORD";
const VALIDATOR_TYPE_PASSWORD_COMPARE = "PASSWORD_COMPARE";
const VALIDATOR_TYPE_FILE = "FILE";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_USERNAME = () => ({ type: VALIDATOR_TYPE_USERNAME });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });

export const VALIDATOR_DISPLAYNAME = (name) => ({ type: VALIDATOR_TYPE_DISPLAYNAME, compare: name });

export const VALIDATOR_PASSWORD_COMPARE = (password) => ({ type: VALIDATOR_TYPE_PASSWORD_COMPARE, compare: password });

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_USERNAME) {
      isValid = isValid && /^[a-zA-Z0-9\-_.]+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    //Password must have at least one digit, one uppercase and one lower case character
    if (validator.type === VALIDATOR_TYPE_PASSWORD) {
      isValid = isValid && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value);
    }

    if (validator.type === VALIDATOR_TYPE_PASSWORD_COMPARE) {
      isValid = isValid && value === validator.compare;
    }

    if (validator.type === VALIDATOR_TYPE_DISPLAYNAME) {
      isValid = isValid && value.toLowerCase() === validator.compare.toLowerCase();
    }
  }
  return isValid;
};
