import * as React from 'react';
import { FFConsumer } from './connect';

export const Debug = () => (
  <div
    style={{
      margin: 0,
      borderRadius: 4,
      background: '#f6f8fa',

      boxShadow: '0 0 1px  #eee inset',
    }}
  >
    <div
      style={{
        fontWeight: 600,
        padding: '8px 16px 8px 16px',
        background: '#c10c1a',
        color: '#fff',
      }}
    >
      Form Foundations Debugger
    </div>
    <FFConsumer>
      {({ validationSchema, validate, ...other }) => {
        return JSON.stringify(other, null, 2);
      }}
    </FFConsumer>
  </div>
);
