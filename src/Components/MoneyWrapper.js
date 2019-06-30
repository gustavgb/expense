import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  wrapper: {
    color: props => props.isPositive ? '#14de2c' : '#de3914',
    display: props => props.displayBlock ? 'block' : 'initial',
    textDecoration: 'underline'
  }
})

const MoneyWrapper = ({ children, displayBlock }) => {
  if (typeof children === 'string' || !isNaN(children)) {
    const isPositive = parseFloat(children, 10) >= 0
    const classes = useStyles({ isPositive, displayBlock })

    return (
      <span className={classes.wrapper}>{children}</span>
    )
  }
  return children
}

export default MoneyWrapper
