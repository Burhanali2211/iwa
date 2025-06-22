// CSS utilities for handling vendor prefixes and browser compatibility

export const cssReset = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }
`;

export const vendorPrefixes = {
  webkit: '-webkit-',
  moz: '-moz-',
  ms: '-ms-',
  o: '-o-',
};

export const getVendorPrefix = (property: string, value: string) => {
  const prefixes = {
    'text-size-adjust': ['-webkit-text-size-adjust', '-moz-text-size-adjust'],
    'font-smoothing': ['-webkit-font-smoothing', '-moz-osx-font-smoothing'],
    'user-select': ['-webkit-user-select', '-moz-user-select', '-ms-user-select'],
    'transform': ['-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'],
    'transition': ['-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition'],
  };

  return prefixes[property as keyof typeof prefixes] || [];
};

// Utility function to create vendor-prefixed CSS properties
export const createVendorPrefixedCSS = (property: string, value: string) => {
  const prefixes = getVendorPrefix(property, value);
  const cssRules: string[] = [];

  prefixes.forEach(prefix => {
    cssRules.push(`${prefix}: ${value};`);
  });

  cssRules.push(`${property}: ${value};`);
  return cssRules.join('\n  ');
}; 