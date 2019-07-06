/* globals firebase */

import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import ExitIcon from '@material-ui/icons/ExitToApp'
import PrevIcon from '@material-ui/icons/ChevronLeft'
import NextIcon from '@material-ui/icons/ChevronRight'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from 'api/auth'
import { formatDate } from 'utils/date'

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
  user: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 1 25%',
    justifyContent: 'flex-end'
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateLabel: {
    width: '150px',
    textAlign: 'center'
  }
}))

const Navigation = ({ show, currentInterval, dateOffset, setDateOffset }) => {
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

  const handlePrevMonth = () => {
    setDateOffset(dateOffset - 1)
  }

  const handleNextMonth = () => {
    setDateOffset(dateOffset + 1)
  }

  const intervalLabel = useMemo(() => {
    return formatDate(new Date(currentInterval.firstDate), 'mmmm yyyy')
  }, [dateOffset])

  return (
    <Slide in={show} timeout={500} unmountOnExit mountOnEnter>
      <AppBar position="sticky">
        <Toolbar className={classes.root}>
          <Typography className={classes.title} variant="h6" noWrap>
            Expense
          </Typography>
          <div className={classes.date}>
            <IconButton
              className={classes.dateButton}
              color="inherit"
              aria-label="Previous month"
              onClick={handlePrevMonth}
            >
              <PrevIcon />
            </IconButton>
            <Typography className={classes.dateLabel} variant="subtitle1" noWrap>
              {intervalLabel}
            </Typography>
            <IconButton
              className={classes.dateButton}
              color="inherit"
              aria-label="Next month"
              onClick={handleNextMonth}
            >
              <NextIcon />
            </IconButton>
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
  show: PropTypes.bool,
  currentInterval: PropTypes.shape({
    firstDate: PropTypes.string
  }),
  dateOffset: PropTypes.number,
  setDateOffset: PropTypes.func
}

export default Navigation
