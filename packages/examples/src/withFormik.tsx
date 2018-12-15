import * as React from 'react';
import * as Yup from 'yup';
import { withFF, Form, Field, ErrorMessage } from '@form-foundations/core';
import Debug from './Debug';

const formikEnhancer = withFF<{ user: any }, {}>({
  mapPropsToValues: props => ({ email: props.user.email }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm', // helps with React DevTools
});

const withFFInner = props => {
  const { dirty, isSubmitting, handleReset } = props;
  return (
    <Form>
      <label htmlFor="email">Email</label>
      <Field name="email" placeholder="jane@acme.com" type="email" />
      <div>
        <ErrorMessage name="email" />
      </div>
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      <Debug />
    </Form>
  );
};

export default formikEnhancer(withFFInner);
