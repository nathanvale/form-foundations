import {
  ComponentDecorator,
  FormikProps,
  FormikValues,
  withFormik,
  WithFormikConfig,
} from 'formik'
import {compose, withHandlers, withState, mapProps, withProps} from 'recompose'
import {handleClick, handleReset} from './handlers'
import * as state from './state'
import {withProvider} from './withProvider'

export const handlers = {
  handleClick,
  handleReset,
}

export const propsMapper = ({state, ...other}) => {
  return {
    ...state,
    ...other,
  }
}

/**
 * Create a wrapper around https://jaredpalmer.com/formik by composing multiple
 * higher-order components into a single HOC. This works exactly like the
 * function of the same name in Redux, or lodash's flowRight(). A prop object is
 * fed into the first HOC and passed down the chain of HOCs - new props are
 * added along the way. Beware of prop name collisions. ;)
 */

export function withFF<
  OuterProps,
  Values extends FormikValues,
  Payload = Values
>(
  options: WithFFConfig<OuterProps, Values, Payload>,
): ComponentDecorator<OuterProps, OuterProps & FormikProps<Values>> {
  return compose<any, any>(
    // leverage the awesome withFormik HOC so we can get access to
    // it's form state props and handlers.
    withFormik(options),
    // next let's compose some of our own custom FF state
    withState(state.name, state.updaterName, state.initialState),
    // and of course we will want to add some of our own custom
    // handlers as well.
    withHandlers(handlers),
    // Finally we need to map (transform) the props object to only
    // props our dumb component cares about.
    mapProps(propsMapper),
    // TODO: please explain
    withProvider,
    withProps(console.log),
  )
}

// eslint-disable-next-line typescript/no-empty-interface
export interface WithFFConfig<OuterProps, Values, Payload>
  extends WithFormikConfig<OuterProps, Values, Payload> {}
