/*

Welcome to Box!

Just remember, if you want to add props, PLEASE PLEASE PLEASE update
the Typescript Types & PropTypes (even though they look scary).

*/

import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import { Omit } from '../types';
import { BoxProps } from './Box.types';
import { propToStyleFn } from './propMapper.helper';

// ;
// React.HTMLAttributes<HTMLDivElement>
const Box: StyledComponentClass<
  BoxProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
  {}
> = styled.div.attrs<BoxProps>({
  'data-id': props => props['data-id'] || 'box',
  style: ({ dangerouslySetInlineStyle }: any) =>
    dangerouslySetInlineStyle && dangerouslySetInlineStyle.__style
      ? dangerouslySetInlineStyle.__style
      : {},
})`
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  ${/*
  This loops through each property and if it exists in the previously
  defined transform map, concatentes the resulting styles. Box's
  runtime is only dependent on the number of properties passed to it
  (which is typically small) instead of the total number of possible
  properties (~30 or so). While it may ~feel~ like Box is
  innefficient, its biggest performance impact is on startup time
  because there's so much code here.
  */
  props => {
    let c = [];
    for (const prop in props) {
      if (Object.prototype.hasOwnProperty.call(propToStyleFn, prop)) {
        const fn = propToStyleFn[prop];
        const value = props[prop];
        c = c.concat(fn(value));
      }
    }
    return c;
  }};
`;

export { Box };
