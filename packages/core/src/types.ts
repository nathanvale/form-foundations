import {
  RadioGroupFieldProps as RadioGroupFieldAtomProps,
  SelectFieldNativeProps as SelectFieldNativeAtomProps,
  TextFieldProps as TextFieldAtomProps,
} from '@form-foundations/atoms';
import {
  FieldConfig as FormikFieldConfig,
  FieldProps,
  GenericFieldHTMLAttributes,
  FormikProps,
  FormikSharedConfig,
  FormikState,
  FormikActions,
  FormikHandlers,
  FormikComputedProps,
  FormikRegistration,
  FormikErrors,
} from 'formik';
import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type FieldPropsInjected<Props = {}, Values = {}> = FieldProps<Values> &
  Props;

/**
 * Note: These typings could be more restrictive, but then it would limit the
 * reusability of custom <Field/> components.
 *
 * @example
 * interface MyProps {
 *   ...
 * }
 *
 * export const MyInput: React.SFC<MyProps & FieldProps> = ({
 *   field,
 *   form,
 *   ...props
 * }) =>
 *   <div>
 *     <input {...field} {...props}/>
 *     {form.touched[field.name] && form.errors[field.name]}
 *   </div>
 */
export interface FieldProps<V = any> {
  field: {
    /** Classic React change handler, keyed by input name */
    onChange: (e: React.ChangeEvent<any>) => void;
    /** Mark input as touched */
    onBlur: (e: any) => void;
    /** Value of the input */
    value: any;
    /* name of the input */
    name: string;
  };
  form: FormikProps<V>; // if ppl want to restrict this for a given form, let them.
}

export interface FieldConfig {
  /**
   * Field component to render. Can either be a string like 'select' or a component.
   */
  component?:
    | string
    | React.ComponentType<FieldProps<any>>
    | React.ComponentType<void>;

  /**
   * Render prop (works like React router's <Route render={props =>} />)
   */
  render?: ((props: FieldProps<any>) => React.ReactNode);

  /**
   * Children render function <Field name>{props => ...}</Field>)
   */
  children?: ((props: FieldProps<any>) => React.ReactNode) | React.ReactNode;

  /**
   * Validate a single field value independently
   */
  validate?: ((value: any) => string | Promise<void> | undefined);

  /**
   * Field name
   */
  name: string;

  /** HTML input type */
  type?: string;

  /** Field value */
  value?: any;

  /** Inner ref */
  innerRef?: (instance: any) => void;
}

export type FieldAttributes<T> = GenericFieldHTMLAttributes & FieldConfig & T;

export type RadioGroupFieldProps =
  | Omit<
      Partial<RadioGroupFieldAtomProps>,
      'error' | 'onChange' | 'value' | 'onBlur'
    >
  | any;

export type TextFieldProps =
  | Omit<Partial<TextFieldAtomProps>, 'error' | 'onChange' | 'value' | 'onBlur'>
  | any;

export type TextFieldNormalizeProps = {
  normalize?: (value: string, previousValue: string) => string;
} & TextFieldProps;

export type SelectFieldNativeProps =
  | Omit<
      Partial<SelectFieldNativeAtomProps>,
      'error' | 'onChange' | 'value' | 'onBlur'
    >
  | any;

// Extended from Formik
export interface FFConfig<Values> extends FormikSharedConfig {
  component?: React.ComponentType<FormikProps<Values>> | React.ReactNode;
  render?: ((props: FFProps<Values>) => React.ReactNode);
  children?: ((props: FFProps<Values>) => React.ReactNode) | React.ReactNode;
  initialValues: Values;
  onReset?: (values: Values, formikActions: FFActions<Values>) => void;
  onSubmit: (values: Values, formikActions: FFActions<Values>) => void;
  validationSchema?: any | (() => any);
  validate?: ((values: Values) => void | object | Promise<FFErrors<Values>>);
}
export type FFErrors<Values> = FormikErrors<Values> & {};
export type FFSharedConfig = FormikSharedConfig & {};
export type FFState<Values> = FormikState<Values> & {};
export type FFActions<Values> = FormikActions<Values> & {};
export type FFHandlers = FormikHandlers & {
  handleClick(e: React.ChangeEvent<any>): void;
  handleClick<T = string | React.ChangeEvent<any>>(field: T): T;
};
export type FFComputedProps<Values> = FormikComputedProps<Values> & {};
export type FFRegistration = FormikRegistration & {};

export type FFProps<Values> = FFSharedConfig &
  FFState<Values> &
  FFActions<Values> &
  FFHandlers &
  FFComputedProps<Values> &
  FFRegistration;

export declare type FFContext<Values> = FFProps<Values> &
  Pick<FFConfig<Values>, 'validate' | 'validationSchema'>;
export interface SharedRenderProps<T> {
  component?: string | React.ComponentType<T | void>;
  render?: ((props: T) => React.ReactNode);
  children?: ((props: T) => React.ReactNode);
}

export declare type GenericFieldHTMLAttributes =
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.SelectHTMLAttributes<HTMLSelectElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
