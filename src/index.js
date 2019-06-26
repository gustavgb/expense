/* globals firebase */

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from 'store'
import { ThemeProvider } from 'styled-components'
import theme from 'theme'

import App from 'App'
import { restoreLogin } from 'actions/auth'
import { navigateTo } from 'actions/navigation'

window.global = {
  window
}

const store = createStore()

let removeListener = false
firebase.auth().onAuthStateChanged(user => {
  if (removeListener) {
    return
  }
  removeListener = true
  if (user) {
    store.dispatch(restoreLogin(user))
  } else {
    store.dispatch(navigateTo('login'))
  }
})

ReactDOM.hydrate(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
