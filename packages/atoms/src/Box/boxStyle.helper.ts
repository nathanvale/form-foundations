import {css} from 'styled-components'
import {BREAK_POINTS} from './mediaQuery.const'
import {media} from './mediaStyle.helper'

const VERTICAL_RHYTHM = '4px'

// TODO: https://origindd.atlassian.net/browse/SAT-31
// Create breakpoint constants and use them in exisiting components

export function display(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      display: ${value};
    `
    return breakpoint
      ? media[breakpoint]`
            ${c}`
      : c
  }
}

export function direction(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      flex-direction: ${value};
    `
    return breakpoint
      ? media[breakpoint]`
            ${c}`
      : c
  }
}

export function alignContent(value) {
  return css`
    align-content: ${value};
  `
}

export function alignItems(value) {
  return css`
    align-items: ${value};
  `
}

export function alignSelf(value) {
  return css`
    align-self: ${value};
  `
}

export function justifyContent(value) {
  return css`
    justify-content: ${value};
  `
}

/* Fix for Chrome 44 bug: https://code.google.com/p/chromium/issues/detail?id=506893 */

export const flexGrow = css`
  flex: 1 1 auto;

  /* 1 */
  min-height: 0;
  min-width: 0;
`

export const flexNone = css`
  flex: 0 0 auto;
`

export const flexWrap = css`
  flex-wrap: wrap;
`

export const orderFirst = css`
  order: -1;
`

export const orderLast = css`
  order: 99999;
`

export const top0 = css`
  top: 0;
`

export const right0 = css`
  right: 0;
`

export const bottom0 = css`
  bottom: 0;
`

export const left0 = css`
  left: 0;
`

/* position */

export const absolute = css`
  position: absolute;
`

export const relative = css`
  position: relative;
`

export const fixed = css`
  position: fixed;
`

/*
IE11 Fallback: when sticky is not supported, fall back to relative positioning.
We do this so if there is a zIndex set on sticky, the stacking context will be correct
*/

export const sticky = css`
  position: relative;
  position: sticky;
`

/* overflow */

export const overflowHidden = css`
  overflow: hidden;
`

export const overflowScroll = css`
  overflow: scroll;
`

export const overflowScrollX = css`
  overflow-x: scroll;
  overflow-y: hidden;
`

export const overflowScrollY = css`
  overflow-x: hidden;
  overflow-y: scroll;
`

export const overflowAuto = css`
  overflow: auto;
`

export const fit = css`
  max-width: 100%;
`

// TODO: strings that are not %100 should convert to numbers with units.
/**
 * This is a copy of the dangerousStyleValue function from react-dom.
 * This function is no longer exported in React 16.x
 */
export function dangerousStyleValue(
  name: string,
  value: any,
  isCustomProperty = false,
) {
  /**
   * CSS properties which accept numbers but are not in units of "px".
   */
  const isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
  }

  const isEmpty = value == null || typeof value === 'boolean' || value === ''
  if (isEmpty) {
    return ''
  }

  if (
    !isCustomProperty &&
    typeof value === 'number' &&
    value !== 0 &&
    !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
  ) {
    return value + 'px' // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim()
}

export function height(value) {
  return css`
    height: ${dangerousStyleValue('height', value)};
  `
}

export function minHeight(value) {
  return css`
    min-height: ${dangerousStyleValue('minHeight', value)};
  `
}

export function maxHeight(value) {
  return css`
    max-height: ${dangerousStyleValue('maxHeight', value)};
  `
}

export function width(value) {
  return css`
    width: ${dangerousStyleValue('width', value)};
  `
}

export function minWidth(value) {
  return css`
    min-width: ${dangerousStyleValue('minWidth', value)};
  `
}

export function maxWidth(value) {
  return css`
    max-width: ${dangerousStyleValue('maxWidth', value)};
  `
}

export function cursor(value) {
  return css`
    cursor: ${value};
  `
}

export function column(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }

  return value => {
    const ncols = 12
    const c = css`
      width: calc(${value} / ${ncols} * 100%);
    `
    if (breakpoint) {
      return media[breakpoint]`
            ${c}
        `
    } else {
      return c
    }
  }
}

export function marginTop(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw new Error(`Breakpoints must be SM, MD, LG or XL`)
  }

  return value => {
    const c = css`
      margin-top: calc(${VERTICAL_RHYTHM} * ${value});
    `
    return breakpoint
      ? media[breakpoint]`
        ${c}`
      : c
  }
}

export function marginRight(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      margin-right: calc(${VERTICAL_RHYTHM} * ${value});
    `
    return breakpoint
      ? media[breakpoint]`
        ${c}`
      : c
  }
}

export function marginBottom(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      margin-bottom: calc(${VERTICAL_RHYTHM} * ${value});
    `
    return breakpoint
      ? media[breakpoint]`
        ${c}`
      : c
  }
}

export function marginLeft(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      margin-left: calc(${VERTICAL_RHYTHM} * ${value});
    `
    return breakpoint
      ? media[breakpoint]`
        ${c}`
      : c
  }
}

export function paddingX(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      padding-left: calc(${VERTICAL_RHYTHM} * ${value});
      padding-right: calc(${VERTICAL_RHYTHM} * ${value});
    `
    return breakpoint
      ? media[breakpoint]`
        ${c}`
      : c
  }
}

export function paddingY(breakpoint?: string) {
  if (breakpoint && !BREAK_POINTS.Min[breakpoint]) {
    throw Error(`Breakpoints must be SM, MD, LG or XL`)
  }
  return value => {
    const c = css`
      padding-bottom: calc(${VERTICAL_RHYTHM} * ${value});
      padding-top: calc(${VERTICAL_RHYTHM} * ${value});
    `
    return breakpoint
      ? media[breakpoint]`
        ${c}`
      : c
  }
}

const borderWidth = 1
const borderColor = '#efefef'
const borderRadius = '8px'

/* Border lines */

export const border = css`
  border: ${borderWidth} solid ${borderColor};
`

export const borderTop = css`
  border-top: ${borderWidth} solid ${borderColor};
`

export const borderRight = css`
  border-right: ${borderWidth} solid ${borderColor};
`

export const borderBottom = css`
  border-bottom: ${borderWidth} solid ${borderColor};
`

export const borderLeft = css`
  border-left: ${borderWidth} solid ${borderColor};
`

/* Border radii */

export const square = css`
  border-radius: 0;
`

export const circle = css`
  border-radius: 50%;
`

export const pill = css`
  border-radius: 999px;
`

export const rounded = css`
  border-radius: ${borderRadius};
`

export const roundedTop = css`
  border-radius: ${borderRadius} ${borderRadius} 0 0;
`

export const roundedRight = css`
  border-radius: 0 ${borderRadius} ${borderRadius} 0;
`

export const roundedBottom = css`
  border-radius: 0 0 ${borderRadius} ${borderRadius};
`

export const roundedLeft = css`
  border-radius: ${borderRadius} 0 0 ${borderRadius};
`

export const noBorder = css`
  border: 0;
`

export const breakpointStyle = (breakpoint?: string) => value => {
  if (!value) {
    return ''
  }
  return css`
    ${value.column
      ? column(breakpoint)(value.column)
      : ''} ${typeof value.display !== 'undefined'
      ? display(breakpoint)(value.display)
      : ''};
  `
}
