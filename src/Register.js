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
  register
} from 'actions/auth'

const MemoizedTextField = React.memo((props) => <TextField {...props} />)

const Login = () => {
  const email = useSelector(state => state.auth.form.email)
  const password = useSelector(state => state.auth.form.password)
  // const status = useSelector(state => state.auth.form.status)

  const dispatch = useDispatch()

  const onChangeEmail = useCallback((value) => dispatch(setEmail(value)), [dispatch])
  const onChangePassword = useCallback((value) => dispatch(setPassword(value)), [dispatch])
  const onRegister = useCallback((e) => { e.preventDefault(); dispatch(register()) })

  return (
    <Container>
      <Text component="h1" size="large">Choose your username and password</Text>
      <form onSubmit={onRegister}>
        <MemoizedTextField required fullWidth name="email" value={email} onChange={onChangeEmail} />
        <MemoizedTextField required fullWidth name="password" value={password} onChange={onChangePassword} hidden />
        <Button fullWidth type="submit">Sign up</Button>
        <Link to="login">Already have an account? Login here.</Link>
      </form>
    </Container>
  )
}

export default Login
