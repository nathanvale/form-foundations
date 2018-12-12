import { Arrays } from '@form-foundations/examples';
import { module, storiesOf } from '@storybook/react';
import './story.css';

const {
  AsyncValidationCode,
} = require('!raw-loader!../packages/examples/src/AsyncValidation');
const { ArraysCode } = require('!raw-loader!../packages/examples/src/Arrays');
const { BasicCode } = require('!raw-loader!../packages/examples/src/Basic.js');
const {
  CustomInputsCode,
} = require('!raw-loader!../packages/examples/src/CustomInputs');
const {
  ErrorMessageCode,
} = require('!raw-loader!../packages/examples/src/ErrorMessage');
const {
  FastFieldCode,
} = require('!raw-loader!../packages/examples/src/FastField');
const {
  MultistepWizardCode,
} = require('!raw-loader!../packages/examples/src/MultistepWizard');
const {
  SchemaValidationCode,
} = require('!raw-loader!../packages/examples/src/SchemaValidation');
const {
  SyncValidationCode,
} = require('!raw-loader!../packages/examples/src/SyncValidation');
const {
  FieldLevelValidationCode,
} = require('!raw-loader!../packages/examples/src/FieldLevelValidation');
const {
  CombinedValidationsCode,
} = require('!raw-loader!../packages/examples/src/CombinedValidations');

function cleanExample(str) {
  return str
    .replace(`import Debug from './Debug';`, '')
    .replace(`<Debug />`, '');
}

const Code = props => (
  <div
    style={{
      margin: '0 12px',
      borderRadius: 4,
      background: '#f6f8fa',
      boxShadow: '0 0 1px  #eee inset',
    }}
  >
    <div
      style={{
        textTransform: 'uppercase',
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: '.5rem',
        background: '#555',
        color: '#fff',
        letterSpacing: '1px',
      }}
    >
      Example Code
    </div>
    <pre
      style={{
        overflowX: 'scroll',
        fontSize: 11,
        padding: '.5rem',
        boxSizing: 'border-box',
      }}
      {...props}
    />
  </div>
);

storiesOf('Example', module).add('Arrays', () => {
  return (
    <div className="formik-example">
      <main>
        <Arrays />
      </main>
      <Code>{cleanExample(ArraysCode)}</Code>
    </div>
  );
});
