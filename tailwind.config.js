module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light: '#005c98',
        faded: '#000059'
      },
      red: {
        primary: '#ed4956'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb'
      }
    }
  }
};
