import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = window.theme = createMuiTheme({
  palette: {
    money: {
      income: '#42cf30',
      expense: '#de3914'
    }
  }
})

export default theme
