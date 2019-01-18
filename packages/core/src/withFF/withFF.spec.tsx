import * as React from 'react';
import { cleanup, fireEvent, wait } from 'react-testing-library';
import * as Yup from 'yup';
import { FFProps } from '../types';
import { renderWithFF } from '../__integration-tests__/helpers';

interface Values {
  firstName: string;
  lastName: string;
}

afterEach(cleanup);

const Form: React.SFC<FFProps<Values>> = ({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  handleClick,
  handleReset,
  touched,
  setStatus,
  status,
  errors,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="first-name"
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={handleClick}
        value={values.firstName}
        name="firstName"
      />
      {touched.firstName && errors.firstName && (
        <div id="feedback">{errors.firstName}</div>
      )}
      <input
        type="text"
        aria-label="last-name"
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={handleClick}
        value={values.lastName}
        name="lastName"
      />
      {touched.lastName && errors.lastName && (
        <div id="feedback">{errors.lastName}</div>
      )}
      {isSubmitting && <div id="submitting">Submitting</div>}
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <button
        id="statusButton"
        onClick={() => setStatus({ myStatusMessage: 'True' })}
      >
        Call setStatus
      </button>
      {status && !!status.myStatusMessage && (
        <div id="statusMessage">{status.myStatusMessage}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

const initialValues: Values = { firstName: 'Nathan', lastName: 'Vale' };

describe('withFF()', () => {
  it('should initialize Formik state and pass down props', () => {
    const { getProps } = renderWithFF<Values>(Form, initialValues);
    const props = getProps();
    expect(props).toMatchSnapshot();
  });

  it('should call render child element', () => {
    const { container } = renderWithFF<Values>(Form, initialValues);
    expect(container.firstChild).toBeDefined();
  });

  it('should call validate with values and props', async () => {
    const validate = jest.fn();
    const myProps = { my: 'prop' };
    const { getProps } = renderWithFF<Values>(
      Form,
      initialValues,
      { validate },
      myProps,
    );

    getProps().submitForm();
    await wait(() =>
      expect(validate).toHaveBeenCalledWith(
        { firstName: 'Nathan', lastName: 'Vale' },
        myProps,
      ),
    );
  });

  it('should call validationSchema', async () => {
    const validate = jest.fn(() => Promise.resolve());
    const { getProps } = renderWithFF<Values>(Form, initialValues, {
      validationSchema: { validate },
    });

    getProps().submitForm();
    await wait(() => expect(validate).toHaveBeenCalled());
  });

  it('should call validationSchema function with props', async () => {
    const validationSchema = jest.fn(() => Yup.object());
    const myProps = { my: 'prop' };
    const { getProps } = renderWithFF<Values>(
      Form,
      initialValues,
      {
        validationSchema,
      },
      myProps,
    );

    getProps().submitForm();
    await wait(() => expect(validationSchema).toHaveBeenCalledWith(myProps));
  });

  it('should call handleSubmit with values, actions and custom props', async () => {
    const handleSubmit = jest.fn();
    const myProps = { my: 'prop' };
    const { getProps } = renderWithFF<Values>(
      Form,
      initialValues,
      {
        handleSubmit,
      },
      myProps,
    );

    getProps().submitForm();

    await wait(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        { firstName: 'Nathan', lastName: 'Vale' },
        {
          props: myProps,
          resetForm: expect.any(Function),
          setError: expect.any(Function),
          setErrors: expect.any(Function),
          setFieldError: expect.any(Function),
          setFieldTouched: expect.any(Function),
          setFieldValue: expect.any(Function),
          setFormikState: expect.any(Function),
          setStatus: expect.any(Function),
          setSubmitting: expect.any(Function),
          setTouched: expect.any(Function),
          setValues: expect.any(Function),
          submitForm: expect.any(Function),
          validateField: expect.any(Function),
          validateForm: expect.any(Function),
        },
      ),
    );
  });

  it('should passe down custom props', () => {
    const { getProps } = renderWithFF<Values>(
      Form,
      initialValues,
      {},
      { my: 'prop' },
    );
    expect(getProps().my).toEqual('prop');
  });

  it('should set the currently active field', () => {
    const { getByLabelText, getProps } = renderWithFF<Values>(
      Form,
      initialValues,
      {},
    );
    let input = getByLabelText('first-name');
    fireEvent.click(input);
    let props = getProps();
    expect(props.active).toEqual({
      firstName: true,
    });
    input = getByLabelText('last-name');
    fireEvent.click(input);
    props = getProps();
    expect(props.active).toEqual({
      lastName: true,
    });
  });

  it('should reset the form', () => {
    const { getByLabelText, getByText, getProps } = renderWithFF<Values>(
      Form,
      initialValues,
      {},
    );
    let input = getByLabelText('first-name');
    fireEvent.click(input);
    fireEvent.blur(input);
    input = getByLabelText('last-name');
    fireEvent.click(input);
    fireEvent.blur(input);
    let button = getByText('Reset');
    fireEvent.click(button);
    let props = getProps();
    expect(props).toMatchSnapshot();
    expect(props.active).toEqual({});
  });
});
