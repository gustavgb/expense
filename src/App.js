import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'

import Home from 'Home'
import Login from 'Login'
import Register from 'Register'

import ScrollContainer from 'Blocks/ScrollContainer'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }
`

const App = () => {
  let child
  const location = useSelector(state => state.navigation.location)

  switch (location) {
    case 'login':
      child = <Login />
      break
    case 'home':
      child = <Home />
      break
    case 'register':
      child = <Register />
      break
    default:
      child = <span />
      break
  }

  return (
    <ScrollContainer>
      <GlobalStyle />
      {child}
    </ScrollContainer>
  )
}

export default App
