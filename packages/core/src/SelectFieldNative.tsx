import {SelectFieldNative as SelectFieldNativeAtom} from '@form-foundations/atoms'
import {Field} from './Field'
import * as React from 'react'
import {mapProps} from 'recompose'
import {materialUIMapper} from './helpers'
import {SelectFieldNativeProps} from './types'

export const EnhancedSelectFieldNative = mapProps<any, any>(materialUIMapper)(
  // TODO: remove this any in TS 3.2
  SelectFieldNativeAtom as any,
)

export const SelectFieldNative: React.ComponentType<
  SelectFieldNativeProps
> = props => <Field component={EnhancedSelectFieldNative} {...props} />
