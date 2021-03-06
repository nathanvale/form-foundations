import {
  ButtonSubmit,
  Form,
  RadioGroupField,
  SelectFieldNative,
  TextField,
  TextFieldNormalize,
  withFF,
} from '@form-foundations/core'
import {FormikProps} from 'formik'
import {onlyLetters} from '@form-foundations/normalize'
import {Box, Button} from '@form-foundations/atoms'
import * as React from 'react'
import * as Yup from 'yup'

// Speed up calls to hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty

function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false
  if (obj.length === 0) return true

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }

  return true
}
export interface Field {
  value: any
  name: string
  onChange: any
  onBlur: any
}

type FormProps = {
  salutation: string
  email: string
  firstName: string
  surname: string
  sex: string
}
interface FormValues {
  email: string
}

const formEnhancer = withFF<FormProps, FormValues>({
  // GOTCHA Even if your form is not receiving any props from its parent, you
  // *MUST* use mapPropsToValues to initialize your forms empty state.
  mapPropsToValues: () => ({
    salutation: '',
    email: '',
    firstName: '',
    surname: '',
    sex: '',
  }),
  validationSchema: Yup.object().shape({
    salutation: Yup.string().required('What is your salutation?'),
    email: Yup.string()
      .email(`Oops, that doesn't look like a valid email address...`)
      .required('Please enter your email address...'),
    firstName: Yup.string().required('Hi, What is your first name?'),
    surname: Yup.string().required('What is your surname?'),
    sex: Yup.string().required('What is your sex?'),
  }),
  handleSubmit: (values, {setSubmitting}) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'MyForm', // helps with React DevTools
})

setTimeout(() => {
  this.setState(prevState => ({
    ...prevState,
    submitting: false,
  }))
}, 2000)

/*
       "label": "Email",
            "placeholder": "Please enter your email address...",
            "subDescription":
                "We may use your personal information to contact you about this service",
            "validations": {
                "required": {
                    "error": "Please enter your email address..."
                },
                "validEmail": {
                    "error":
                        "Oops, that doesn't look like a valid email address..."
                }
            }*/

/*
                    "firstName": {
            "label": "First name",
            "placeholder": "First name",
            "maxLength": 40,
            "validations": {
                "required": {
                    "error": "Hi, What is your first name?"
                },
                "nonNumeric": {
                    "error":
                        "First name cannot contain numbers or special characters"
                }
            }
        },
        "lastName": {
            "label": "Surname",
            "placeholder": "Surname",
            "maxLength": 40,
            "validations": {
                "required": {
                    "error": "What is your surname?"
                },
                "nonNumeric": {
                    "error":
                        "Last name cannot contain numbers or special characters"
                }
            }
        },

             {
        /*       
      */

const InnerForm: React.SFC<FormProps & FormikProps<FormValues>> = ({
  dirty,
  isSubmitting,
  handleReset,
  errors,
}) => (
  <Form debug>
    <Box
      justifyContent={'start'}
      alignItems={'start'}
      direction={'column'}
      display={'flex'}
      color="white"
      padding={4}
    >
      <SelectFieldNative
        fullWidth
        label="Salutation"
        name="salutation"
        options={[
          {
            value: 'Mr.',
            label: 'Mr.',
          },
          {
            value: 'Mrs.',
            label: 'Mrs.',
          },
          {
            value: 'Miss',
            label: 'Miss',
          },
          {
            value: 'Dr.',
            label: 'Dr.',
          },
          {
            value: 'Ms.',
            label: 'Ms.',
          },
          {
            value: 'Prof.',
            label: 'Prof.',
          },
        ]}
      />

      <RadioGroupField name="sex" />
      <TextFieldNormalize
        fullWidth
        label="First name"
        name="firstName"
        normalize={onlyLetters}
      />

      <TextField fullWidth label="Surname" name="surname" />

      <TextField
        fullWidth
        label="Email"
        name="email"
        helperText="We may use your personal information to contact you about this service"
      />

      <Box
        justifyContent={'start'}
        alignItems={'baseline'}
        direction={'row'}
        display={'flex'}
        marginBottom={4}
      >
        <Button
          type="button"
          onClick={handleReset}
          disabled={(!dirty || isSubmitting) && isEmpty(errors)}
        >
          Reset
        </Button>
        <Box width={10} />
        <ButtonSubmit />
      </Box>
    </Box>
  </Form>
)

export default formEnhancer(InnerForm)
