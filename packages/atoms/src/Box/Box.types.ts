import {
  StyledComponentClass,
  Styles,
  InterpolationFunction,
} from 'styled-components';

/*
Box's type definition is exhaustive. With the exception of
`dangerouslySetInlineStyle`, values shouldn't be ambiguous. That means that we
have to type out things, but that's also where Box's magic lies. By putting in
extra effort around type definitions here, we can skip extra runtime typechecks
in the transformers for performance.
*/

export type BoxDisplay =
  | 'none'
  | 'flex'
  | 'block'
  | 'inlineBlock'
  | 'inlineFlex';
export type BoxDirection = 'row' | 'column';
export type BoxColumnType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export type BoxResponsiveProps = {
  column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  display?: boolean | 'flex' | 'flexColumn' | 'inlineBlock';
};
export type BoxMargin =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export type BoxPadding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type BoxAlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'stretch';

export type BoxAlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

export type BoxAlignSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';

export type BoxJustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around';

export type BoxOverflow =
  | 'visible'
  | 'hidden'
  | 'scroll'
  | 'scrollX'
  | 'scrollY'
  | 'auto';

export type BoxPosition = 'static' | 'absolute' | 'relative' | 'fixed';

export type BoxFlex = 'grow' | 'shrink' | 'none';

export type BoxCursor =
  | '-moz-grab'
  | '-webkit-grab'
  | 'alias'
  | 'all-scroll'
  | 'auto'
  | 'cell'
  | 'col-resize'
  | 'context-menu'
  | 'copy'
  | 'crosshair'
  | 'default'
  | 'e-resize'
  | 'ew-resize'
  | 'grab'
  | 'grabbing'
  | 'help'
  | 'move'
  | 'n-resize'
  | 'ne-resize'
  | 'nesw-resize'
  | 'no-drop'
  | 'none'
  | 'not-allowed'
  | 'ns-resize'
  | 'nw-resize'
  | 'nwse-resize'
  | 'pointer'
  | 'progress'
  | 'row-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'text'
  | 'vertical-text'
  | 'w-resize'
  | 'wait'
  | 'zoom-in'
  | 'zoom-out';

export interface BoxProps {
  children?: React.ReactNode;
  dangerouslySetInlineStyle?: { __style: { [key: string]: any } };
  cursor?: BoxCursor;
  xs?: BoxResponsiveProps;
  sm?: BoxResponsiveProps;
  md?: BoxResponsiveProps;
  lg?: BoxResponsiveProps;

  display?: BoxDisplay;
  column?: BoxColumnType;
  direction?: BoxDirection;
  smDisplay?: BoxDisplay;
  smColumn?: BoxColumnType;
  smDirection?: BoxDirection;
  mdDisplay?: BoxDisplay;
  mdColumn?: BoxColumnType;
  mdDirection?: BoxDirection;
  lgDisplay?: BoxDisplay;
  lgColumn?: BoxColumnType;
  lgDirection?: BoxDirection;

  alignContent?: BoxAlignContent;
  alignItems?: BoxAlignItems;
  alignSelf?: BoxAlignSelf;
  bottom?: boolean;
  color?: string;
  fit?: boolean;
  flex?: BoxFlex;
  height?: number | string;
  justifyContent?: BoxJustifyContent;
  left?: boolean;

  margin?: BoxMargin;
  marginTop?: BoxMargin;
  marginRight?: BoxMargin;
  marginBottom?: BoxMargin;
  marginLeft?: BoxMargin;

  smMargin?: BoxMargin;
  smMarginTop?: BoxMargin;
  smMarginRight?: BoxMargin;
  smMarginBottom?: BoxMargin;
  smMarginLeft?: BoxMargin;

  mdMargin?: BoxMargin;
  mdMarginTop?: BoxMargin;
  mdMarginRight?: BoxMargin;
  mdMarginBottom?: BoxMargin;
  mdMarginLeft?: BoxMargin;

  lgMargin?: BoxMargin;
  lgMarginTop?: BoxMargin;
  lgMarginRight?: BoxMargin;
  lgMarginBottom?: BoxMargin;
  lgMarginLeft?: BoxMargin;

  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;

  overflow?: BoxOverflow;

  padding?: BoxPadding;
  smPadding?: BoxPadding;
  mdPadding?: BoxPadding;
  lgPadding?: BoxPadding;

  paddingX?: BoxPadding;
  smPaddingX?: BoxPadding;
  mdPaddingX?: BoxPadding;
  lgPaddingX?: BoxPadding;

  paddingY?: BoxPadding;
  smPaddingY?: BoxPadding;
  mdPaddingY?: BoxPadding;
  lgPaddingY?: BoxPadding;

  position?: BoxPosition;
  right?: boolean;
  size?: any;
  shape?:
    | 'square'
    | 'rounded'
    | 'pill'
    | 'circle'
    | 'roundedTop'
    | 'roundedBottom'
    | 'roundedLeft'
    | 'roundedRight';
  shrink?: boolean;
  top?: boolean;
  width?: number | string;
  flexWrap?: boolean;
  description?: string;
  tracking?: string;
  'data-id'?: string;
}

export type StyleFn = (
  value: any,
) =>
  | ''
  | (
      | string
      | number
      | Styles
      | StyledComponentClass<BoxProps, any, BoxProps>
      | InterpolationFunction<BoxProps>)[];

export type StyleFnProps = { [P in keyof BoxProps]: StyleFn };
