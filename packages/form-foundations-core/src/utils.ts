export function warnAboutMissingIdentifier({
  htmlContent,
  documentationAnchorLink,
  handlerName
}: {
  htmlContent: string;
  documentationAnchorLink: string;
  handlerName: string;
}) {
  console.error(
    `Warning: Formik called \`${handlerName}\`, but you forgot to pass an \`id\` or \`name\` attribute to your input:

    ${htmlContent}

    Formik cannot determine which value to update. For more info see https://github.com/jaredpalmer/formik#${documentationAnchorLink}
  `
  );
}

export {
  getIn,
  setIn,
  setNestedObjectValues,
  isFunction,
  isObject,
  isInteger,
  isString,
  isNaN,
  isEmptyChildren,
  isPromise,
  getActiveElement
} from 'formik';
