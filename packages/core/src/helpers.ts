import { TextFieldProps } from '@form-foundations/atoms';
import { FormikErrors, FormikTouched, getIn } from 'formik';
import { FieldPropsInjected, TextFieldNormalizeProps } from './types';

/**
 *
 */
export function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args));
}

/**
 * This mapper abstracts away the tedious wrapper code needed to
 * convert formik field props to Material UI shapes. It is exported so
 * you can build on top of it (with functional composition) for more
 * specialized behavior.
 */
export function materialUIMapper({
  field,
  form,
  disabled = false,
  ...props
}: FieldPropsInjected<TextFieldProps>): any /*TODO: remove any */ {
  const { name } = field;
  const { touched, errors, isSubmitting } = form;
  const showError = isFieldShowingError({ errors, touched, name });
  return {
    ...props,
    ...field,
    error: showError,
    helperText: getFieldHelperText({
      errors: errors,
      name: name,
      helperText: props.helperText,
      touched,
    }),
    disabled: isSubmitting || disabled,
  };
}

/**
 * (value, previousValue)
 */
export function normalizeMapper({
  field,
  form,
  normalize,
  ...props
}: FieldPropsInjected<TextFieldNormalizeProps>): any /*TODO: remove any */ {
  const { name } = field;
  const { values } = form;
  const previousValue = values[name];
  field.onChange = event => {
    const { value } = event.target;
    form.setFieldValue(name, value ? normalize(value, previousValue) : '');
  };
  return {
    ...props,
    field,
    form,
  };
}

/**
 *
 */
export function fieldError(props: {
  errors: FormikErrors<{}>;
  name: string;
}): string {
  const { errors, name } = props;
  const fieldError = getIn(errors, name);
  return fieldError;
}

/**
 *
 */
export function getFieldHelperText({
  errors,
  name,
  touched,
  helperText,
}: {
  errors: FormikErrors<{}>;
  name: string;
  touched: FormikTouched<{}>;
  helperText: string | undefined;
}): string | undefined {
  return isFieldShowingError({ errors, name, touched })
    ? fieldError({ errors, name })
    : helperText;
}

/**
 *
 */
export function isFieldShowingError<Values = {}>({
  errors,
  touched,
  name,
}: {
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  name: string;
}): boolean {
  return getIn(touched, name) && !!fieldError({ errors, name });
}
