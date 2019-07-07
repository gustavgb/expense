import React from 'react'
import PropTypes from 'prop-types'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import DatePicker from 'Components/DatePicker'
import DialogContentText from '@material-ui/core/DialogContentText'
import CategoryPicker from 'Components/CategoryPicker'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  inputWrapper: {
    margin: theme.spacing(2, 0, 3)
  },
  entryTypeList: {
    paddingBottom: theme.spacing(3)
  },
  amountWrapper: {
    display: 'flex',
    margin: theme.spacing(2, 0, 3)
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

const EntryForm = ({ form: { description, amount, date, type, category }, onChangeField, children, onSubmit }) => {
  const classes = useStyles()

  return (
    <form onSubmit={onSubmit}>
      <DialogContent className={classes.root}>
        <DialogContentText>Enter the amount you've {type === 'expense' ? 'spent' : 'earned'} below.</DialogContentText>
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
        <DialogContentText>Describe this entry below. Something short and descriptive.</DialogContentText>
        <div className={classes.inputWrapper}>
          <TextField
            required
            placeholder="Description"
            value={description}
            onChange={({ target: { value } }) => onChangeField('description', value)}
            fullWidth
            variant="outlined"
          />
        </div>
        <DialogContentText>When did you {type === 'expense' ? 'spend' : 'earn'} this money?</DialogContentText>
        <DatePicker
          className={classes.inputWrapper}
          value={date}
          onChange={(value) => onChangeField('date', value)}
        />
        <DialogContentText>Choose a category.</DialogContentText>
        <CategoryPicker
          className={classes.inputWrapper}
          value={category}
          onChange={(value) => onChangeField('category', value)}
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
    type: PropTypes.string,
    category: PropTypes.string
  }),
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  onChangeField: PropTypes.func
}

export default EntryForm
