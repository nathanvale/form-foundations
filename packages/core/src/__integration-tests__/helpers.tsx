import * as React from 'react';
import { render, RenderResult } from 'react-testing-library';
import { withFF } from '../';
import { FFProps } from '../types';

// tslint:disable-next-line:no-empty
export const noop = () => {};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function renderWithFF<Values = {}>(
  Form: React.SFC<FFProps<Values>>,
  initialValues: any,
  options?: any,
  props?: any,
): RenderResult & { getProps: () => any } {
  let injected: any;

  const Component = props => (injected = props) && <Form {...props} />;
  Component.displayName = 'FFForm';

  const FFForm = withFF<{}, Values>({
    mapPropsToValues: () => initialValues,
    handleSubmit: noop,
    ...options,
  })(Component);

  expect(FFForm.displayName).toBe(
    'WithFormik(withState(withHandlers(mapProps(withProvider))))',
  );

  return {
    getProps() {
      return injected;
    },
    ...render(<FFForm {...props} />),
  };
}
