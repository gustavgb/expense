import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Home from 'Modules/Home'
import Login from 'Modules/Login'

import useGlobalState from 'hooks/useGlobalState'

const App = () => {
  let child
  const [location] = useGlobalState('location', 'home')

  switch (location) {
    case 'login':
      child = <Login />
      break
    case 'home':
      child = <Home />
      break
    default:
      child = <span />
      break
  }

  return (
    <>
      <CssBaseline />
      {child}
    </>
  )
}

export default App
