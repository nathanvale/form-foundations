import { Button } from '@form-foundations/atoms';
import { connect, FormikContext } from 'formik';
import * as React from 'react';

const ButtonSubmitInner = (props: { formik: FormikContext<any> }) => {
  return (
    <Button type="submit" disabled={props.formik.isSubmitting}>
      Submit
    </Button>
  );
};

export const ButtonSubmit = connect<{}>(ButtonSubmitInner);
