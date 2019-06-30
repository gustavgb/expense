import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import useForm from 'hooks/useForm'

import {
  login,
  register
} from 'api/auth'

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  input: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  textCenter: {
    textAlign: 'center',
    width: '100%'
  }
}))

const Login = () => {
  const [type, setType] = useState('login')

  const [{ email, password, status }, { setField, resetForm, submit }] = useForm(
    {
      email: '',
      password: ''
    },
    type === 'login' ? login : register
  )

  const onToggleType = useCallback(() => {
    if (type === 'register') {
      setType('login')
    } else {
      setType('register')
    }
    resetForm()
  }, [type])

  const classes = useStyles()

  return (
    <Fade in timeout={500}>
      <Container maxWidth="sm" className={classes.container}>
        <Typography
          component="h1"
          variant="h5"
          gutterBottom
          className={classes.textCenter}
        >
          Welcome to Expense. You're about to log in.
        </Typography>
        <form onSubmit={submit}>
          <TextField
            required
            fullWidth
            name="email"
            value={email}
            onChange={({ target: { value } }) => setField('email', value)}
            className={classes.input}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            name="password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setField('password', value)}
            className={classes.input}
            variant="outlined"
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            color="primary"
            className={classes.button}
          >
            {status === 'pending' && (<CircularProgress color="inherit" size={23} />)}
            {status === 'ready' && (type === 'login' ? 'Login' : 'Register')}
          </Button>
          <Button onClick={onToggleType} className={classes.textCenter}>
            {type === 'login'
              ? 'Don\'t have an account? Sign up instead.'
              : 'Already have an account? Login here.'
            }
          </Button>
        </form>
      </Container>
    </Fade>
  )
}

export default Login
