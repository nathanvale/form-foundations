import {StandardProps} from '@material-ui/core'
import {
  FormControlClassKey,
  FormControlProps,
} from '@material-ui/core/FormControl'
import {FormHelperTextProps} from '@material-ui/core/FormHelperText'
import {FormLabelProps} from '@material-ui/core/FormLabel'
import {RadioProps as MUIRadioProps} from '@material-ui/core/Radio'
import {RadioGroupProps} from '@material-ui/core/RadioGroup'
import {TextFieldProps as MUITextFieldProps} from '@material-ui/core/TextField'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type SelectFieldNativeProps = {options: any} & TextFieldProps

export type TextFieldProps = {
  helperText?: string | undefined
} & MUITextFieldProps

export type RadioProps = {
  error?: boolean
  'data-id'?: string
} & Omit<
  MUIRadioProps,
  'color' | 'classes' | 'disableRipple' | 'checkedIcon' | 'icon' | 'id'
>

export interface RadioGroupFieldProps
  extends StandardProps<
    FormControlProps,
    RadioGroupFieldClassKey,
    'onChange' | 'defaultValue'
  > {
  error?: boolean
  fullWidth?: boolean
  required?: boolean
  label?: React.ReactNode
  FormLabelProps?: Partial<FormLabelProps>
  id?: string
  onChange?: (event: React.ChangeEvent<{}>, value: string) => void
  value?: string
  name?: string
  placeholder?: string
  RadioGroupProps?: Partial<RadioGroupProps>
  helperText?: React.ReactNode
  FormHelperTextProps?: Partial<FormHelperTextProps>
}

export interface RadioGroupFieldInnerProps extends RadioGroupFieldProps {
  handleChange: any
  state: any
  helperTextId: string
}

export type RadioGroupFieldClassKey = FormControlClassKey
