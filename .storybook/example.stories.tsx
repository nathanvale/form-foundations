import {
  AsyncValidation,
  Basic,
  CombinedValidations,
  CustomInputs,
  ErrorMessage,
  FastField,
  FieldLevelValidation,
  MultistepWizard,
  SchemaValidation,
  SyncValidation,
} from '../packages/examples/src';
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

storiesOf('Example', module)
  .add('Basic', () => {
    return (
      <div className="formik-example">
        <main>
          <Basic />
        </main>
        <Code>{cleanExample(BasicCode)}</Code>
      </div>
    );
  })
  .add('Arrays', () => {
    return (
      <div className="formik-example">
        <main>
          <Arrays />
        </main>
        <Code>{cleanExample(ArraysCode)}</Code>
      </div>
    );
  })
  .add('Async Validation', () => {
    return (
      <div className="formik-example">
        <main>
          <AsyncValidation />
        </main>
        <Code>{cleanExample(AsyncValidationCode)}</Code>
      </div>
    );
  })
  .add('Custom Inputs', () => {
    return (
      <div className="formik-example">
        <main>
          <CustomInputs />
        </main>
        <Code>{cleanExample(CustomInputsCode)}</Code>
      </div>
    );
  })
  .add('Using <ErrorMessage />', () => {
    return (
      <div className="formik-example">
        <main>
          <ErrorMessage />
        </main>
        <Code>{cleanExample(ErrorMessageCode)}</Code>
      </div>
    );
  })
  .add('FastField', () => {
    return (
      <div className="formik-example">
        <main>
          <FastField />
        </main>
        <Code>{cleanExample(FastFieldCode)}</Code>
      </div>
    );
  })
  .add('Multistep Wizard', () => {
    return (
      <div className="formik-example">
        <main>
          <MultistepWizard />
        </main>
        <Code>{cleanExample(MultistepWizardCode)}</Code>
      </div>
    );
  })
  .add('Yup Schema Validation', () => {
    return (
      <div className="formik-example">
        <main>
          <SchemaValidation />
        </main>
        <Code>{cleanExample(SchemaValidationCode)}</Code>
      </div>
    );
  })
  .add('Sync Validation', () => {
    return (
      <div className="formik-example">
        <main>
          <SyncValidation />
        </main>
        <Code>{cleanExample(SyncValidationCode)}</Code>
      </div>
    );
  })
  .add('Field-level Validation', () => {
    return (
      <div className="formik-example">
        <main>
          <FieldLevelValidation />
        </main>
        <Code>{cleanExample(FieldLevelValidationCode)}</Code>
      </div>
    );
  })
  .add('Combined Validations', () => {
    return (
      <div className="formik-example">
        <main>
          <CombinedValidations />
        </main>
        <Code>{cleanExample(CombinedValidationsCode)}</Code>
      </div>
    );
  });
