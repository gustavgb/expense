import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: 'white',
    backgroundColor: props => theme.palette.primary[props.error ? 'error' : 'primary'],
    position: 'fixed',
    left: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}))

const StatusIndicator = ({ label, show, error }) => {
  const classes = useStyles({ error })

  return (
    <Slide in={show} timeout={250} direction="up">
      <Paper className={classes.root}>
        <Typography variant="body1">{label}</Typography>
      </Paper>
    </Slide>
  )
}

StatusIndicator.propTypes = {
  label: PropTypes.string,
  show: PropTypes.bool,
  error: PropTypes.bool
}

export default StatusIndicator
