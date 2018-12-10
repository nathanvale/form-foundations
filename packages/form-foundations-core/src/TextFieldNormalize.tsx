import {
  TextField as TextFieldAtom,
  TextFieldProps,
} from '@origin-digital/form-foundations-atoms';
import { Field } from './Field';
import * as React from 'react';
import { branch, compose, mapProps } from 'recompose';
import { materialUIMapper, normalizeMapper } from './helpers';
import { TextFieldNormalizeProps } from './types';

export const EnhancedTextField = compose(
  branch(
    // only apply the normalizeMapper if a normalize function exists
    (props: TextFieldNormalizeProps) => !!props.normalize,
    mapProps(normalizeMapper),
  ),
  mapProps(materialUIMapper),
)(TextFieldAtom);

export const TextFieldNormalize: React.ComponentType<
  TextFieldNormalizeProps
> = props => <Field component={EnhancedTextField} {...props} />;
