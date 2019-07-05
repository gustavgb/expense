/* globals firebase */

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'

import theme from 'setup/theme'

import App from 'Modules/App'

import { setState } from 'utils/globalState'
import useGlobalState from 'hooks/useGlobalState'

const enableAuthWatcher = () => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setState('location', 'overview')
    } else {
      setState('location', 'login')
    }
    setState('initialized', true)
  })
}

const Main = () => {
  const [initialized] = useGlobalState('initialized')
  useEffect(enableAuthWatcher, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        {initialized && (
          <App />
        )}
      </div>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)
