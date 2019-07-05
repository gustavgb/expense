import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = window.theme = createMuiTheme({
  palette: {
    money: {
      income: '#14de2c',
      expense: '#de3914'
    }
  }
})

export default theme
