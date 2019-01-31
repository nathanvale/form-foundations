import {css} from 'styled-components'
import {BREAK_POINTS} from './mediaQuery.const'

const styledCss: Function = css
export const media = {
  SM: (...args) => styledCss`
    @media only screen and (min-width: ${BREAK_POINTS.Min.SM}) {
      ${styledCss(...args)};
    }
  `,

  MD: (...args) => css`
    @media only screen and (min-width: ${BREAK_POINTS.Min.MD}) {
      ${styledCss(...args)};
    }
  `,

  /* Large devices (desktops, 992px and up) */
  LG: (...args) => css`
    @media only screen and (min-width: ${BREAK_POINTS.Min.LG}) {
      ${styledCss(...args)};
    }
  `,
  /* Extra large devices (large desktops, 1200px and up) */
  XL: (...args) => css`
    @media only screen and (min-width: ${BREAK_POINTS.Min.XL}) {
      ${styledCss(...args)};
    }
  `,
} as any
