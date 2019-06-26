import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'App'

import createStore from 'store'

window.global = {
  window
}

const store = createStore()

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
