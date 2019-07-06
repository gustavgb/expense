import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { getSelectionYears, getSelectionMonths, getSelectionDates, formatMonth, formatPlainDate } from 'utils/date'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  input: {
    flex: '1 0 auto',
    marginLeft: theme.spacing(1),
    '&:first-child': {
      marginLeft: 0
    }
  }
}))

const DatePicker = ({ onChange, value, required }) => {
  const classes = useStyles()

  const [initialYear, initialMonth, initialDate] = useMemo(() => {
    const now = value ? new Date(value) : new Date()
    return [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    ]
  }, [])
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [date, setDate] = useState(initialDate)

  const years = useMemo(getSelectionYears, [])
  const months = useMemo(getSelectionMonths, [])
  const dates = useMemo(() => getSelectionDates(year, month), [year, month])

  const handleChangeYear = ({ target: { value } }) => setYear(value)
  const handleChangeMonth = ({ target: { value } }) => setMonth(value)
  const handleChangeDate = ({ target: { value } }) => setDate(value)

  useEffect(() => {
    if (date > dates.length) {
      setDate(dates.length)
    }
  }, [date, dates.length])

  useEffect(() => {
    const nextDate = formatPlainDate(year, month, date)
    if (nextDate !== value) {
      onChange(nextDate)
    }
  }, [year, month, date])

  useEffect(() => {
    if (value) {
      const then = new Date(value)
      setDate(then.getDate())
      setYear(then.getFullYear())
      setMonth(then.getMonth() + 1)
    }
  }, [value])

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.input} required={required}>
        <Select
          native
          value={year}
          onChange={handleChangeYear}
          input={<OutlinedInput />}
        >
          {years.map(y => (
            <option key={`year${y}`} value={y}>{y}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.input} required={required}>
        <Select
          native
          value={month}
          onChange={handleChangeMonth}
          input={<OutlinedInput />}
        >
          {months.map(m => (
            <option key={`month${m}`} value={m}>{formatMonth(m)}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.input} required={required}>
        <Select
          native
          value={date}
          onChange={handleChangeDate}
          input={<OutlinedInput />}
        >
          {dates.map(d => (
            <option key={`date${d}`} value={d}>{d}</option>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool
}

export default DatePicker
