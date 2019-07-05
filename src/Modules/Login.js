import React from 'react'
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import useForm from 'hooks/useForm'

import {
  login
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
    width: '260px',
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
  const [{ email, password, status }, { setField, submit }] = useForm(
    {
      email: '',
      password: ''
    },
    login
  )

  const classes = useStyles()

  return (
    <Fade in timeout={500}>
      <Card className={classes.container}>
        <form onSubmit={submit}>
          <CardContent>
            <TextField
              required
              fullWidth
              name="email"
              value={email}
              onChange={({ target: { value } }) => setField('email', value)}
              className={classes.input}
              variant="outlined"
              label="Email"
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
              label="Password"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
              className={classes.button}
            >
              {status === 'pending' && (<CircularProgress color="inherit" size={23} />)}
              {status !== 'pending' && 'Login'}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Fade>
  )
}

export default Login
