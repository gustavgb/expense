import React from 'react'
import PropTypes from 'prop-types'
import DialogContent from '@material-ui/core/DialogContent'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2, 0)
  }
}))

const EntryForm = ({ form: { description, amount, date }, onChangeField, children, onSubmit }) => {
  const classes = useStyles()

  const handleChangeDate = (value) => {
    onChangeField('date', value.toISOString().replace(/T(\w|:|.)*/, ''))
  }

  return (
    <form onSubmit={onSubmit}>
      <DialogContent>
        <TextField
          required
          autoFocus
          placeholder="Enter description"
          value={description}
          onChange={({ target: { value } }) => onChangeField('description', value)}
          className={classes.input}
          fullWidth
          variant="outlined"
        />
        <TextField
          required
          placeholder="Enter amount"
          value={amount}
          onChange={({ target: { value } }) => onChangeField('amount', value)}
          type="number"
          className={classes.input}
          fullWidth
          variant="outlined"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            value={date}
            onChange={handleChangeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            className={classes.input}
            fullWidth
            inputVariant="outlined"
            autoOk
            disableToolbar
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      {children}
    </form>
  )
}

EntryForm.propTypes = {
  form: PropTypes.shape({
    description: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string
  }),
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  onChangeField: PropTypes.func
}

export default EntryForm
