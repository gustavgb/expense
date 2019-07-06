import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    color: props => props.isPositive ? theme.palette.money.income : theme.palette.money.expense,
    display: props => props.displayBlock ? 'block' : 'initial'
  }
}))

const MoneyWrapper = ({ children, className = '', displayBlock }) => {
  if (typeof children === 'string' || !isNaN(children)) {
    const isPositive = parseFloat(children, 10) >= 0
    const classes = useStyles({ isPositive, displayBlock })
    const amount = children.toFixed(2) + ' kr'

    return (
      <span className={`${classes.wrapper} ${className}`}>{amount}</span>
    )
  }
  return children
}

export default MoneyWrapper
