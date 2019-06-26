import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TextField from 'Components/TextField'
import Container from 'Blocks/Container'
import Button from 'Blocks/Button'
import Text from 'Blocks/Text'
import Link from 'Blocks/Link'

import {
  setEmail,
  setPassword,
  login
} from 'actions/auth'

const MemoizedTextField = React.memo((props) => <TextField {...props} />)

const Login = () => {
  const email = useSelector(state => state.auth.form.email)
  const password = useSelector(state => state.auth.form.password)
  // const status = useSelector(state => state.auth.form.status)

  const dispatch = useDispatch()

  const onChangeEmail = useCallback((value) => dispatch(setEmail(value)), [dispatch])
  const onChangePassword = useCallback((value) => dispatch(setPassword(value)), [dispatch])
  const onLogin = useCallback((e) => { e.preventDefault(); dispatch(login()) })

  return (
    <Container>
      <Text component="h1" size="large">Enter credentials</Text>
      <form onSubmit={onLogin}>
        <MemoizedTextField required fullWidth name="email" value={email} onChange={onChangeEmail} />
        <MemoizedTextField required fullWidth name="password" value={password} onChange={onChangePassword} hidden />
        <Button fullWidth type="submit">Login</Button>
        <Link to="register">Don't have an account? Sign up instead.</Link>
      </form>
    </Container>
  )
}

export default Login
