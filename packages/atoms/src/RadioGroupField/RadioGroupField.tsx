import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as React from 'react';
import {
  compose,
  withHandlers,
  withState,
  mapProps,
  withProps,
} from 'recompose';
import styled from 'styled-components';
import { Radio } from '../Radio';
import { RadioGroupFieldInnerProps, RadioGroupFieldProps } from '../types';
import { handleChange } from './handlers';
import * as state from './state';
import { omit } from 'lodash';

export const RadioGroupFieldInner = styled<RadioGroupFieldInnerProps>(
  ({
    handleChange,
    state,
    helperTextId,
    className,
    error,
    fullWidth,
    required,
    label,
    FormLabelProps,
    id,
    onBlur,
    onChange,
    onFocus,
    value,
    name,
    placeholder,
    RadioGroupProps,
    helperText,
    FormHelperTextProps,
    ...other
  }) => (
    <FormControl
      aria-describedby={helperTextId}
      className={className}
      error={error}
      fullWidth={fullWidth}
      required={required}
      variant="standard"
      {...other}
    >
      {label && (
        <FormLabel htmlFor={id} {...FormLabelProps}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        {...RadioGroupProps}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio error={error} />}
          label="(Disabled option)"
        />
      </RadioGroup>
      {helperText && (
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  ),
)`
  && {
  }
`;

export const handlers = {
  handleChange,
};

// TODO: move to @origin-digital/recompose
const omitProps = keys => mapProps(props => omit(props, keys));

export const enhance = compose<RadioGroupFieldInnerProps, RadioGroupFieldProps>(
  withProps(console.log),
  withState(state.name, state.updaterName, state.initialState),
  withHandlers(handlers),
  omitProps('setState'),
  withProps(console.log),
);

export const RadioGroupField = enhance(RadioGroupFieldInner as any);
