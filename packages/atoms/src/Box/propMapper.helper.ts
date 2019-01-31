import {css} from 'styled-components'
import {
  absolute,
  alignContent,
  alignItems,
  alignSelf,
  bottom0,
  breakpointStyle,
  circle,
  column,
  cursor,
  direction,
  display,
  fit,
  fixed,
  flexGrow,
  flexNone,
  flexWrap,
  height,
  justifyContent,
  left0,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  overflowAuto,
  overflowHidden,
  overflowScroll,
  overflowScrollX,
  overflowScrollY,
  pill,
  relative,
  right0,
  rounded,
  roundedBottom,
  roundedLeft,
  roundedRight,
  roundedTop,
  top0,
  width,
} from './boxStyle.helper'
import {mapping, rangeWithoutZero, toggle, union} from './transform.helper'

const backgroundColor: any = () => css`
  ${({color}: any) => `background-color: ${color};`};
`
const marginTop = rangeWithoutZero('marginTop')
const marginRight = rangeWithoutZero('marginRight')
const marginBottom = rangeWithoutZero('marginBottom')
const marginLeft = rangeWithoutZero('marginLeft')
const margin = union(marginTop, marginBottom, marginLeft, marginRight)

const smMarginTop = rangeWithoutZero('marginTop', 'SM')
const smMarginRight = rangeWithoutZero('marginRight', 'SM')
const smMarginBottom = rangeWithoutZero('marginBottom', 'SM')
const smMarginLeft = rangeWithoutZero('marginLeft', 'SM')
const smMargin = union(smMarginTop, smMarginBottom, smMarginLeft, smMarginRight)

const mdMarginTop = rangeWithoutZero('marginTop', 'MD')
const mdMarginRight = rangeWithoutZero('marginRight', 'MD')
const mdMarginBottom = rangeWithoutZero('marginBottom', 'MD')
const mdMarginLeft = rangeWithoutZero('marginLeft', 'MD')
const mdMargin = union(mdMarginTop, mdMarginBottom, mdMarginLeft, mdMarginRight)

const lgMarginTop = rangeWithoutZero('marginTop', 'LG')
const lgMarginRight = rangeWithoutZero('marginRight', 'LG')
const lgMarginBottom = rangeWithoutZero('marginBottom', 'LG')
const lgMarginLeft = rangeWithoutZero('marginLeft', 'LG')
const lgMargin = union(lgMarginTop, lgMarginBottom, lgMarginLeft, lgMarginRight)

const paddingX = rangeWithoutZero('paddingX')
const paddingY = rangeWithoutZero('paddingY')
const padding = union(paddingX, paddingY)

const smPaddingX = rangeWithoutZero('paddingX', 'SM')
const smPaddingY = rangeWithoutZero('paddingY', 'SM')
const smPadding = union(smPaddingX, smPaddingY)

const mdPaddingX = rangeWithoutZero('paddingX', 'MD')
const mdPaddingY = rangeWithoutZero('paddingY', 'MD')
const mdPadding = union(mdPaddingX, mdPaddingY)

const lgPaddingX = rangeWithoutZero('paddingX', 'LG')
const lgPaddingY = rangeWithoutZero('paddingY', 'LG')
const lgPadding = union(lgPaddingX, lgPaddingY)

// TODO: remove this any
export const propToStyleFn: any = {
  xs: breakpointStyle(),
  sm: breakpointStyle('SM'),
  md: breakpointStyle('MD'),
  lg: breakpointStyle('LG'),
  display: mapping({
    none: display()('none'),
    flex: display()('flex'),
    block: display()('block'),
    inlineBlock: display()('inline-block'),
    inlineFlex: display()('inline-flex'),
  }),
  column: column(),
  direction: mapping({
    row: direction()('row'),
    column: direction()('column'),
  }),
  smDisplay: mapping({
    none: display('SM')('none'),
    flex: display('SM')('flex'),
    block: display('SM')('block'),
    inlineBlock: display('SM')('inline-block'),
    inlineFlex: display('SM')('inline-flex'),
  }),
  smColumn: column('SM'),
  smDirection: mapping({
    row: direction('SM')('row'),
    column: direction('SM')('column'),
  }),

  mdDisplay: mapping({
    none: display('MD')('none'),
    flex: display('MD')('flex'),
    block: display('MD')('block'),
    inlineBlock: display('MD')('inline-block'),
    inlineFlex: display('MD')('inline-flex'),
  }),
  mdColumn: column('MD'),
  mdDirection: mapping({
    row: direction('MD')('row'),
    column: direction('MD')('column'),
  }),

  lgDisplay: mapping({
    none: display('LG')('none'),
    flex: display('LG')('flex'),
    block: display('LG')('block'),
    inlineBlock: display('LG')('inline-block'),
    inlineFlex: display('LG')('inline-flex'),
  }),
  lgColumn: column('LG'),
  lgDirection: mapping({
    row: direction('LG')('row'),
    column: direction('LG')('column'),
  }),
  alignContent: mapping({
    start: alignContent('flex-start'),
    end: alignContent('flex-end'),
    center: alignContent('center'),
    between: alignContent('space-between'),
    around: alignContent('space-around'),
    // default: stretch
  }),
  alignItems: mapping({
    start: alignItems('flex-start'),
    end: alignItems('flex-end'),
    center: alignItems('center'),
    baseline: alignItems('baseline'),
    // default: stretch
  }),
  alignSelf: mapping({
    start: alignSelf('flex-start'),
    end: alignSelf('flex-end'),
    center: alignSelf('center'),
    baseline: alignSelf('baseline'),
    stretch: alignSelf('stretch'),
    // default: auto
  }),
  bottom: toggle(bottom0),
  color: backgroundColor,
  fit: toggle(fit),
  flex: mapping({
    grow: flexGrow,
    none: flexNone,
    // default: shrink
  }),
  justifyContent: mapping({
    end: justifyContent('flex-end'),
    center: justifyContent('center'),
    between: justifyContent('space-between'),
    around: justifyContent('space-around'),
    // default: start
  }),
  left: toggle(left0),
  cursor,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  smMargin,
  smMarginTop,
  smMarginRight,
  smMarginBottom,
  smMarginLeft,
  mdMargin,
  mdMarginTop,
  mdMarginRight,
  mdMarginBottom,
  mdMarginLeft,
  lgMargin,
  lgMarginTop,
  lgMarginRight,
  lgMarginBottom,
  lgMarginLeft,
  overflow: mapping({
    hidden: overflowHidden,
    scroll: overflowScroll,
    auto: overflowAuto,
    scrollX: overflowScrollX,
    scrollY: overflowScrollY,
    // default: visible
  }),
  padding,
  paddingX,
  paddingY,
  smPadding,
  smPaddingX,
  smPaddingY,
  mdPadding,
  mdPaddingX,
  mdPaddingY,
  lgPadding,
  lgPaddingX,
  lgPaddingY,
  position: mapping({
    absolute,
    relative,
    fixed,
    // default: static
  }),
  right: toggle(right0),
  shape: mapping({
    circle: circle,
    pill: pill,
    rounded: rounded,
    roundedBottom: roundedBottom,
    roundedLeft: roundedLeft,
    roundedRight: roundedRight,
    roundedTop: roundedTop,
    // default: square
  }),
  top: toggle(top0),
  flexWrap: toggle(flexWrap),
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
}
