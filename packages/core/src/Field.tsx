import * as React from 'react';
import warning from 'tiny-warning';
import { connect } from './connect';
import { FieldAttributes, FFContext, FieldProps } from './types';
import { getIn, isEmptyChildren, isFunction } from './utils';

/**
 * Custom Field component for quickly hooking into Formik
 * context and wiring up forms.
 */
class FieldInner<Values = {}, Props = {}> extends React.Component<
  FieldAttributes<Props> & { ff: FFContext<Values> },
  {}
> {
  constructor(props: FieldAttributes<Props> & { ff: FFContext<Values> }) {
    super(props);
    const { render, children, component } = props;
    warning(
      !(component && render),
      'You should not use <Field component> and <Field render> in the same <Field> component; <Field component> will be ignored',
    );

    warning(
      !(component && children && isFunction(children)),
      'You should not use <Field component> and <Field children> as a function in the same <Field> component; <Field component> will be ignored.',
    );

    warning(
      !(render && children && !isEmptyChildren(children)),
      'You should not use <Field render> and <Field children> in the same <Field> component; <Field children> will be ignored',
    );
  }

  componentDidMount() {
    // Register the Field with the parent Formik. Parent will cycle through
    // registered Field's validate fns right prior to submit
    this.props.ff.registerField(this.props.name, this);
  }

  componentDidUpdate(
    prevProps: FieldAttributes<Props> & { ff: FFContext<Values> },
  ) {
    if (this.props.name !== prevProps.name) {
      this.props.ff.unregisterField(prevProps.name);
      this.props.ff.registerField(this.props.name, this);
    }

    if (this.props.validate !== prevProps.validate) {
      this.props.ff.registerField(this.props.name, this);
    }
  }

  componentWillUnmount() {
    this.props.ff.unregisterField(this.props.name);
  }

  render() {
    const {
      validate,
      name,
      render,
      children,
      component = 'input',
      ff,
      ...props
    } = (this.props as FieldAttributes<Props> & {
      ff: FFContext<Values>;
    }) as any;
    const {
      validate: _validate,
      validationSchema: _validationSchema,
      ...restOfFormik
    } = ff;
    const field = {
      value:
        props.type === 'radio' || props.type === 'checkbox'
          ? props.value // React uses checked={} for these inputs
          : getIn(ff.values, name),
      name,
      onChange: ff.handleChange,
      onBlur: ff.handleBlur,
      onClick: ff.handleClick,
    };
    const bag = { field, form: restOfFormik };

    if (render) {
      return (render as any)(bag);
    }

    if (isFunction(children)) {
      return (children as (props: FieldProps<any>) => React.ReactNode)(bag);
    }

    if (typeof component === 'string') {
      const { innerRef, ...rest } = props;
      return React.createElement(component as any, {
        ref: innerRef,
        ...field,
        ...rest,
        children,
      });
    }

    return React.createElement(component as any, {
      ...bag,
      ...props,
      children,
    });
  }
}

export const Field = connect<FieldAttributes<any>, any>(FieldInner);
