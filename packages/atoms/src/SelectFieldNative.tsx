import * as React from 'react';
import styled from 'styled-components';
import { TextField } from './TextField';
import { SelectFieldNativeProps } from './types';

export const SelectFieldNative = styled<SelectFieldNativeProps>(props => (
  <TextField
    {...props}
    select
    SelectProps={{
      native: true,
      MenuProps: {
        // className: classes.menu
      },
    }}
  >
    {props.options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </TextField>
))`
  && {
  }
` as React.ComponentType<SelectFieldNativeProps>;
