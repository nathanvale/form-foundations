import * as boxStyleHelper from './boxStyle.helper'
/*
Transforms
These are a collection of a few functors that take values and returns
Style's. OMG, I used the word functor - it's really just a fancy word for
function.
*/

/**
 * Adds a style when a property is present
 * <Box top />
 * @param mixin
 */

export const toggle = (mixin: any) => (val: any) => (val ? mixin : '')

/**
 * Maps string values to styles
 * <Box alignItems="center" />
 * @param map
 */
export const mapping = (map: any) => (val: any) =>
  Object.prototype.hasOwnProperty.call(map, val) ? map[val] : ''

/**
 * Maps a range of integers to a range of classnames
 * <Box padding={1} />
 * @param scale
 * @param breakpoint
 */
export const range = (scale: any, breakpoint: any) => (n: any) =>
  boxStyleHelper[scale](breakpoint)(n)

/**
 * Like `range`, maps a range of integers to a range of classnames, excluding
 * zero values.
 * <Box padding={1} />
 * @param scale
 * @param breakpoint
 */

/**
 * Create a range only if the value is not zero.
 */
export const rangeWithoutZero = (scale: any, breakpoint?: string) => (n: any) =>
  n === 0 ? '' : range(scale, breakpoint)(n)

/**
 * This takes a series of the previously defined functors, runs them all against
 * a value and returns the set of their classnames.
 * @param fns
 */
export const union = (...fns: any) => (val: any) =>
  [].concat(fns.map((fn: any) => fn(val)))
