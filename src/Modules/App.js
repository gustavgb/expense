import React from 'react'
import { styled } from '@material-ui/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Home from 'Modules/Home'
import Login from 'Modules/Login'

import useGlobalState from 'hooks/useGlobalState'

const Wrapper = styled('div')({
  minHeight: '100vh'
})

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
    <Wrapper>
      <CssBaseline />
      {child}
    </Wrapper>
  )
}

export default App
