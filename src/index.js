/* globals firebase */

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'

import theme from 'setup/theme'

import App from 'Modules/App'

import { setState } from 'utils/globalState'

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    setState('location', 'home')
  } else {
    setState('location', 'login')
  }
})

const Main = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)
