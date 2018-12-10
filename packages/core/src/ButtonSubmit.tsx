import * as React from 'react';
import { connect, getIn, FormikContext } from 'formik';
import { Button } from '@form-foundations/atoms';

const ButtonSubmitInner = (props: { formik: FormikContext<any> }) => {
  return (
    <Button type="submit" disabled={props.formik.isSubmitting}>
      Submit
    </Button>
  );
};

export const ButtonSubmit = connect<{}>(ButtonSubmitInner);
