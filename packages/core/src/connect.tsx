import createContext from 'create-react-context'
import hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'
import {FFContext} from './types'

export const {Provider: FFProvider, Consumer: FFConsumer} = createContext<
  FFContext<any>
>({} as any)

/**
 * Connect any component to Form Foundations context, and inject as a prop called `ff`;
 * @param Comp React Component
 */
export function connect<OuterProps, Values = {}>(
  Comp: React.ComponentType<OuterProps & {ff: FFContext<Values>}>,
) {
  const C: React.SFC<OuterProps> = (props: OuterProps) => (
      <FFConsumer>{ff => <Comp {...props} ff={ff} />}</FFConsumer>
    )
    // Assign Comp to C.WrappedComponent so we can access the inner component in tests
    // For example, <Field.WrappedComponent /> gets us <FieldInner/>
  ;(C as React.SFC<OuterProps> & {
    WrappedComponent: React.ReactNode
  }).WrappedComponent = Comp

  return hoistNonReactStatics<OuterProps, OuterProps & {ff: FFContext<Values>}>(
    C,
    Comp as React.ComponentClass<OuterProps & {ff: FFContext<Values>}>, // cast type to ComponentClass (even if SFC)
  ) as React.ComponentClass<OuterProps> & {
    WrappedComponent: React.ComponentClass<OuterProps & {ff: FFContext<Values>}>
  }
}
