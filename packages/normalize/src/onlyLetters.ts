import { shouldDeleteLastChar } from './@internal/helper';

export function format(value) {
  return value.replace(/[^a-zA-Z ]+/g, '');
}

export function onlyLetters(value, previousValue) {
  if (!value) {
    return value;
  }

  return shouldDeleteLastChar(value, previousValue, '') || format(value);
}
