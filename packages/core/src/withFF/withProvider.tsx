// AuthUser.jsx
import hoistNonReactStatics from 'hoist-non-react-statics';
import * as React from 'react';
import { FFProvider } from '../connect';

export const withProvider = Comp => {
  const C = props => {
    return (
      <FFProvider value={props}>
        <Comp {...props} />
      </FFProvider>
    );
  };
  C.displayName = 'withProvider';

  return hoistNonReactStatics<any, any>(C, Comp);
};
