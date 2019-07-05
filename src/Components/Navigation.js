/* globals firebase */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Slide from '@material-ui/core/Slide'
import ExitIcon from '@material-ui/icons/ExitToApp'
import { fade, makeStyles } from '@material-ui/core/styles'
import { logout } from 'api/auth'

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'space-between'
  },
  logoutButton: {
    marginLeft: theme.spacing(2)
  },
  title: {
    display: 'none',
    flex: '0 1 25%',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 1 25%',
    justifyContent: 'flex-end'
  }
}))

const Navigation = ({ show }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email)
      } else {
        setEmail('')
      }
    })
  })

  return (
    <Slide in={show} timeout={500} unmountOnExit mountOnEnter>
      <AppBar position="sticky">
        <Toolbar className={classes.root}>
          <Typography className={classes.title} variant="h6" noWrap>
            Expense
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
          <div className={classes.user}>
            <Typography className={classes.username} variant="subtitle1" noWrap>
              {email}
            </Typography>
            <IconButton
              edge="end"
              className={classes.logoutButton}
              color="inherit"
              aria-label="Logout"
              onClick={logout}
            >
              <ExitIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

Navigation.propTypes = {
  show: PropTypes.bool
}

export default Navigation
