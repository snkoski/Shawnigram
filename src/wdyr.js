import React from 'react';

// eslint-disable-next-line global-require
const whyDidYouRender = require('@welldone-software/why-did-you-render');

whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true
});
