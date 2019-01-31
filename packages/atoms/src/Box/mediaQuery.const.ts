export const BREAK_POINTS = {
  /*
    Extra small devices (portrait phones, less than 544px)
    No media query since this is the default at Origin because we are "mobile first"
    */
  Min: {
    /* Small devices (landscape phones, 544px and up) */
    SM: '576px',
    /* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
    MD: '768px',
    /* Large devices (desktops, 992px and up) */
    LG: '992px',
    /* Extra large devices (large desktops, 1200px and up) */
    XL: '1200px',
  },
  Max: {
    SM: '575px',
    MD: '767px',
    LG: '991px',
    XL: '1199px',
  },
}
