import * as React from 'react'
import {connect} from 'formik'
import {Debug} from './Debug'

export type FormikFormProps = Pick<
  React.FormHTMLAttributes<HTMLFormElement>,
  Exclude<
    keyof React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  >
> & {debug?: boolean}

export const Form = connect<FormikFormProps>(
  ({formik: {handleReset, handleSubmit}, children, debug, ...other}) => (
    <form onReset={handleReset} onSubmit={handleSubmit} {...other}>
      {children}
      {debug ? <Debug /> : null}
    </form>
  ),
)

Form.displayName = 'Form'
