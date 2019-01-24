import * as boxStyleHelper from './boxStyle.helper';

/*

Transforms

These are a collection of a few functors that take values and returns Style's. OMG, I used the word functor - it's really just a fancy word for function.

*/

// Adds a style when a property is present.
//
//     <Box top />
//
export const toggle = mixin => val => (val ? mixin : '');

// Maps string values to classes
//
//     <Box alignItems="center" />
//
export const mapping = map => val =>
  Object.prototype.hasOwnProperty.call(map, val) ? map[val] : '';

// Maps a range of integers to a range of classnames
//
//     <Box padding={1} />
//
export const range = (scale, breakpoint) => n =>
  boxStyleHelper[scale](breakpoint)(n);
// fromClassName(`${scale}${n < 0 ? `N${Math.abs(n)}` : n}`);

// Like `range`, maps a range of integers to a range of classnames, excluding
// zero values.
//
//     <Box padding={0} />
export const rangeWithoutZero = (scale, breakpoint?: string) => n =>
  n === 0 ? '' : range(scale, breakpoint)(n);

// This takes a series of the previously defined functors, runs them all
// against a value and returns the set of their classnames.
export const union = (...fns: any) => (val: any) =>
  [].concat(fns.map((fn: any) => fn(val)));
