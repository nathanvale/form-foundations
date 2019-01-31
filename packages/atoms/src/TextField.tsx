import MUITextField from '@material-ui/core/TextField'
import * as React from 'react'
import styled, {keyframes} from 'styled-components'
import {TextFieldProps} from './types'
export const headShake = keyframes`
  0% {
     transform: translateX(0);
   }
   6.5% {
     transform: translateX(-6px) rotateY(-9deg);
   }
   18.5% {
     transform: translateX(5px) rotateY(7deg);
   }
   31.5% {
     transform: translateX(-3px) rotateY(-5deg);
   }
   43.5% {
     transform: translateX(2px) rotateY(3deg);
   }
   50% {
     transform: translateX(0);
   }
`

export const TextField = styled<TextFieldProps>(props => (
  <MUITextField
    {...props}
    helperText={props.helperText ? props.helperText : '\n'}
    classes={{
      root: 'TextField-root',
      fullWidth: 'TextField-fullWidth',
      marginDense: 'TextField-marginDense',
      marginNormal: 'TextField-marginNormal',
    }}
    margin="normal"
    variant="filled"
    FormHelperTextProps={{
      required: true,
      classes: {
        contained: 'FormHelperText-contained',
        disabled: 'FormHelperText-contained',
        error: 'FormHelperText-error',
        filled: 'FormHelperText-filled',
        focused: 'FormHelperText-focused',
        marginDense: 'FormHelperText-marginDense',
        required: 'FormHelperText-required',
        root: 'FormHelperText-root',
      },
    }}
    InputLabelProps={{
      classes: {
        animated: 'InputLabel-animated',
        disabled: 'InputLabel-disabled',
        error: 'InputLabel-error',
        filled: 'InputLabel-filled',
        focused: 'InputLabel-focused',
        formControl: 'InputLabel-formControl',
        marginDense: 'InputLabel-marginDense',
        outlined: 'InputLabel-outlined',
        required: 'InputLabel-required',
        root: 'InputLabel-root',
        shrink: 'InputLabel-shrink',
      },
    }}
    InputProps={{
      classes: {
        adornedEnd: 'Input-adornedEnd',
        adornedStart: 'Input-adornedStart',
        disabled: 'Input-disabled',
        error: 'Input-error',
        focused: 'Input-focused',
        input: 'Input-input',
        inputAdornedEnd: 'Input-inputAdornedEnd',
        inputAdornedStart: 'Input-inputAdornedStart',
        inputMarginDense: 'Input-inputMarginDense',
        inputMultiline: 'Input-inputMultiline',
        multiline: 'Input-multiline',
        root: 'Input-root',
        underline: 'Input-underline',
      },
    }}
    SelectProps={{
      classes: {
        disabled: 'Select-disabled',
        filled: 'Select-filled',
        outlined: 'Select-outlined',
        icon: 'Select-icon',
        root: 'Select-root',
        select: 'Select-select',
        selectMenu: 'Select-selectMenu',
      },
    }}
  />
))`
  && {
    margin-top: 0px;
    margin-bottom: 16px;

    // FORM HELPER TEXT

    & .FormHelperText-root {
      min-height: 20px;
      font-family: 'gordita', sans-serif;
      color: #737373;
      font-size: 12px;
      line-height: 20px;
      font-weight: 400;
      margin-top: 4px;
    }

    & .FormHelperText-error {
    }

    & .FormHelperText-root.FormHelperText-error {
      color: #ec0000;
      animation-name: ${headShake};
      animation-timing-function: ease-in-out;
      animation-duration: 0.8s;
      animation-delay: 0;
    }

    // INPUT

    & .Input-root {
      font-family: 'gordita', sans-serif;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      background-color: rgba(0, 0, 0, 0.05490196078431373);
      &:hover {
        background-color: rgba(0, 0, 0, 0.08235294117647058);
      }

      &:before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.29045643153526974);
      }
    }

    & .Input-input {
      font-size: 16px;
      line-height: 24px;
      color: #505050;
      padding-top: 24px;
      padding-bottom: 8px;
    }

    & .Input-disabled {
    }

    & .Input-focused {
    }

    & .Input-error {
    }

    // INPUT UNDERLINE

    & .Input-underline {
      &:hover:not(.Input-disabled):not(.Input-focused):not(.Input-error):before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5085470085470085);
      }
      &:after {
        border-bottom: 2px solid #3f75c6;
      }
    }

    & .Input-underline.Input-error {
      &:after {
        border-bottom: 2px solid #ec0000;
      }
    }

    // INPUT LABEL

    & .InputLabel-root {
      font-family: 'gordita', sans-serif;
      font-size: 16px;
      line-height: 24px;
      color: #666;
      transform: translate(12px, 16px) scale(1);
    }

    & .InputLabel-shrink.InputLabel-error {
      color: #ec0000;
    }

    & .InputLabel-shrink {
      transform: translate(12px, 8px) scale(0.75);
    }
  }
` as React.ComponentType<TextFieldProps>
