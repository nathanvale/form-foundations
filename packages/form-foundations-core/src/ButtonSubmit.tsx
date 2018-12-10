import * as React from 'react';
import { connect, getIn, FormikContext } from 'formik';
import { Button } from '@origin-digital/form-foundations-atoms';

const ButtonSubmitInner = (props: { formik: FormikContext<any> }) => {
  return (
    <Button type="submit" text="Submit" disabled={props.formik.isSubmitting} />
  );
};

export const ButtonSubmit = connect(ButtonSubmitInner) as typeof Button;
