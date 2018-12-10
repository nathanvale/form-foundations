import React from 'react';
import { FFConsumer } from './connect';
import { Code } from '@origin-digital/style-guide';

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
      {({ validationSchema, validate, onSubmit, ...other }) => {
        return <Code language="json">{JSON.stringify(other, null, 2)}</Code>;
      }}
    </FFConsumer>
  </div>
);
