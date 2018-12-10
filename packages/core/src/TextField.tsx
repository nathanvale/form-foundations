import { TextField as TextFieldAtom } from '@form-foundations/atoms';
import { Field } from './Field';
import * as React from 'react';
import { mapProps } from 'recompose';
import { materialUIMapper } from './helpers';
import { TextFieldProps } from './types';

export const EnhancedTextField = mapProps(materialUIMapper)(TextFieldAtom);

export const TextField: React.ComponentType<TextFieldProps> = props => (
  <Field component={EnhancedTextField} {...props} />
);
