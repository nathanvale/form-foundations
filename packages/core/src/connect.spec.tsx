import React from 'react'
import {cleanup, render, RenderResult} from 'react-testing-library'
import {connect, Field, withFF} from '.'
import {noop} from './__integration-tests__/helpers'

interface Values {
  email: string
}

afterEach(cleanup)

export function renderConnect<Values = {}>(
  Component: React.ComponentType<any>,
): RenderResult & {getProps: () => any} {
  let injected: any

  const C = props => (injected = props) && <Component {...props} />
  C.displayName = 'C'

  const ConnectedComponent = connect<any, Values>(C)

  const FFForm = withFF<{}, Values>({
    handleSubmit: noop,
  })(props => (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <Field type="email" name="email" placeholder="Email" />
        <Field component="select" name="color">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>
        {/*         <Field component={CustomInputComponent} name="firstName" /> */}
        <button type="submit">Submit</button>
      </form>
      }
      <ConnectedComponent />
    </React.Fragment>
  ))

  return {
    getProps() {
      return injected
    },
    ...render(<FFForm />),
  }
}

describe('connect()', () => {
  it('should connect the FF context', () => {
    const Component = props => <div {...props} />
    const {getProps} = renderConnect<Values>(Component)
    const props = getProps()
    expect(props).toMatchSnapshot()
  })
})
