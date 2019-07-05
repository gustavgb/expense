import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/moment'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'

import { addEntry } from 'api/entries'
import useForm from 'hooks/useForm'

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2, 0)
  }
}))

const AddEntryDialog = ({ open, onClose, onAfterSubmit }) => {
  const classes = useStyles()

  const [{ description, amount, date, status: addStatus }, { setField, resetForm, submit }] = useForm(
    {
      description: '',
      amount: '',
      date: new Date().toISOString(),
      tags: []
    },
    (form) => addEntry(form)
      .then(() => () => {
        resetForm()
        onAfterSubmit()
        onClose()
      })
  )

  const handleChangeDate = (value) => {
    setField('date', value.toISOString().replace(/T(\w|:|.)*/, ''))
  }

  return (
    <Dialog
      open={open}
      TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
      aria-labelledby="simple-dialog-title"
      onClose={onClose}
    >
      <DialogTitle id="simple-dialog-title">Add new entry</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          {addStatus === 'pending' && (<LinearProgress />)}
          <TextField
            required
            autoFocus
            placeholder="Enter description"
            value={description}
            onChange={({ target: { value } }) => setField('description', value)}
            className={classes.input}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            placeholder="Enter amount"
            value={amount}
            onChange={({ target: { value } }) => setField('amount', value)}
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
        <DialogActions className={classes.actions}>
          <Button onClick={onClose} disabled={addStatus !== 'ready'}>Cancel</Button>
          <Button type="submit" disabled={addStatus !== 'ready'} color="primary">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

AddEntryDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAfterSubmit: PropTypes.func
}

export default AddEntryDialog
