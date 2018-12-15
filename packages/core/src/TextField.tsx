import { TextField as TextFieldAtom } from '@form-foundations/atoms';
import { Field } from './Field';
import * as React from 'react';
import { mapProps } from 'recompose';
import { materialUIMapper } from './helpers';
import { TextFieldProps } from './types';

export const EnhancedTextField: any = mapProps<any, any>(materialUIMapper)(
  // TODO: remove this any in TS 3.2
  TextFieldAtom as any,
);

export const TextField: React.ComponentType<TextFieldProps> = props => (
  <Field component={EnhancedTextField} {...props} />
);
