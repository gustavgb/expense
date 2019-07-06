import React from 'react'
import PropTypes from 'prop-types'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import DatePicker from 'Components/DatePicker'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2, 0)
  },
  entryTypeList: {
    paddingBottom: theme.spacing(3)
  },
  amountWrapper: {
    display: 'flex',
    margin: theme.spacing(2, 0)
  },
  entryTypeInput: {
    flex: '0 0 auto',
    marginRight: theme.spacing(1.5)
  },
  amountInput: {
    flex: '1 0 auto'
  },
  income: {
    color: theme.palette.money.income
  },
  expense: {
    color: theme.palette.money.expense
  }
}))

const EntryForm = ({ form: { description, amount, date, type }, onChangeField, children, onSubmit }) => {
  const classes = useStyles()

  return (
    <form onSubmit={onSubmit}>
      <DialogContent>
        <div className={classes.amountWrapper}>
          <FormControl variant="outlined">
            <Select
              native
              value={type}
              onChange={({ target: { value } }) => onChangeField('type', value)}
              variant="outlined"
              className={`${classes.entryTypeInput}${type ? ` ${classes[type]}` : ''}`}
              input={<OutlinedInput />}
            >
              <option value="expense" className={classes.expense}>Expense</option>
              <option value="income" className={classes.income}>Income</option>
            </Select>
          </FormControl>
          <TextField
            required
            autoFocus
            placeholder={`Amount ${type === 'expense' ? 'spent' : 'earned'}`}
            value={amount}
            onChange={({ target: { value } }) => onChangeField('amount', value)}
            type="number"
            className={classes.amountInput}
            variant="outlined"
            inputProps={{
              min: 0
            }}
          />
        </div>
        <TextField
          required
          placeholder="Description"
          value={description}
          onChange={({ target: { value } }) => onChangeField('description', value)}
          className={classes.input}
          fullWidth
          variant="outlined"
        />
        <DatePicker
          className={classes.input}
          value={date}
          onChange={(value) => onChangeField('date', value)}
        />
      </DialogContent>
      {children}
    </form>
  )
}

EntryForm.propTypes = {
  form: PropTypes.shape({
    description: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    type: PropTypes.string
  }),
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  onChangeField: PropTypes.func
}

export default EntryForm
