import { RadioGroupField as RadioGroupFieldAtom } from '@origin-digital/form-foundations-atoms';
import { Field } from './Field';
import * as React from 'react';
import { mapProps, compose, withProps } from 'recompose';
import { materialUIMapper } from './helpers';
import { RadioGroupFieldProps } from './types';

export const EnhancedTextField = compose(
  withProps(console.log),
  mapProps(materialUIMapper),
)(RadioGroupFieldAtom);

export const RadioGroupField: React.ComponentType<
  RadioGroupFieldProps
> = props => <Field component={EnhancedTextField} {...props} />;
