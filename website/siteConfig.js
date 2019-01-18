/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'The Palmer Group',
    image: 'img/logos/palmer.svg',
    infoLink: 'https://palmer.net',
    pinned: true,
    style: {
      maxWidth: 50,
    },
  },
  {
    caption: 'Airbnb',
    image: 'img/logos/airbnb.svg',
    infoLink: 'https://airbnb.com',
    pinned: true,
  },
  {
    caption: 'Walmart',
    image: 'img/logos/walmart.svg',
    infoLink: 'https://walmart.com',
    pinned: true,
  },

  {
    caption: 'OpenTable',
    image: 'img/logos/opentable.svg',
    infoLink: 'https://opentable.com',
    pinned: true,
  },
  {
    caption: 'Lyft',
    image: 'img/logos/lyft.svg',
    infoLink: 'https://lyft.com',
    pinned: true,
  },
  {
    caption: 'Docker',
    image: 'img/logos/docker.svg',
    infoLink: 'https://docker.com',
    pinned: true,
  },
  {
    caption: 'Viacom',
    image: 'img/logos/viacom.svg',
    infoLink: 'https://viacom.com',
    pinned: true,
  },
  {
    caption: 'Nokia',
    image: 'img/logos/nokia.svg',
    infoLink: 'https://nokia.com',
    pinned: true,
  },
  {
    caption: 'Sony',
    image: 'img/logos/sony.svg',
    infoLink: 'https://sony.com',
    pinned: true,
  },
  {
    caption: 'Postmates',
    image: 'img/logos/postmates.svg',
    infoLink: 'https://postmates.com',
  },
  {
    caption: 'Capsule Health',
    image: 'img/logos/capsule.svg',
    infoLink: 'https://capsulecares.com',
  },
  {
    caption: 'Frame.io',
    image: 'img/logos/frameio.png',
    infoLink: 'https://frame.io',
  },
  {
    caption: 'RVshare',
    image: 'img/logos/rvshare.svg',
    infoLink: 'https://rvshare.com',
  },
  {
    caption: 'Extendi',
    image: 'img/logos/extendi.svg',
    infoLink: 'https://www.extendi.it',
  },
];

const siteConfig = {
  title: 'Form Foundations', // Title for your website.
  tagline: `Build forms in React, without tears.`,
  url: 'https://formfoundations.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: '',
  organizationName: 'nathanvale',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'
  editUrl: 'https://github.com/nathanvale/form-foundations/edit/master/docs/',
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'overview', label: 'Docs' },
    { page: 'help', label: 'Help' },
    {
      href: 'https://github.com/nathanvale/form-foundations',
      label: 'GitHub',
    },
    // { blog: true, label: 'Blog' },
  ],
  noIndex: false,
  search: true,
  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/ff.svg',
  footerIcon: 'img/ff.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#111',
    secondaryColor: '#111',
    grayDarker: '#333',
    gray: '#555',
    grayLighter: '#888',
    accentColor: '#785BA3',
    actionColor: '#008cf2',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Nathan Vale. All Rights Reserved.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },
  usePrism: ['jsx', 'typescript'],
  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    'js/code-blocks-buttons.js',
  ],
  stylesheets: ['css/code-blocks-buttons.css'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,
  // Open Graph and Twitter card images.
  ogImage: 'img/ff-og.png',
  twitterImage: 'img/ff-twitter.png',
  algolia: {
    apiKey: '32fabc38a054677ee9b24e69d699fbd0',
    indexName: 'ff',
    algoliaOptions: {
      facetFilters: ['version:VERSION'],
    },
  },
  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/nathanvale/form-foundations',
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  enableUpdateTime: true,
  gaTrackingId: 'UA-55176740-4',
  twitter: true,
  twitterUsername: 'nathanvalejs',
};

module.exports = siteConfig;
