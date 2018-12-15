import { SelectFieldNative as SelectFieldNativeAtom } from '@form-foundations/atoms';
import { Field } from './Field';
import * as React from 'react';
import { mapProps } from 'recompose';
import { materialUIMapper } from './helpers';
import { SelectFieldNativeProps } from './types';

export const EnhancedSelectFieldNative: any = mapProps(materialUIMapper)(
  SelectFieldNativeAtom,
);

export const SelectFieldNative: React.ComponentType<
  SelectFieldNativeProps
> = props => <Field component={EnhancedSelectFieldNative} {...props} />;
