export default {
  palette: {
    grays: (intensity) => {
      if (intensity > 100 || intensity < 0) {
        throw new Error('')
      }
      return '#' + new Array(3).fill(Math.round(intensity * 2.55).toString(16)).join('')
    }
  },
  fontFamily: {
    main: 'Roboto, sans-serif'
  },
  fontSize: {
    xsmall: '0.8rem',
    small: '1.2rem',
    medium: '1.5rem',
    large: '1.8rem',
    xlarge: '2.2rem',
    xxlarge: '2.6rem'
  }
}
