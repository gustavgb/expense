import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import EntryForm from 'Components/EntryForm'
import Collapse from '@material-ui/core/Collapse'

import { addEntry } from 'api/entries'
import useForm from 'hooks/useForm'

const useStyles = makeStyles((theme) => ({
  income: {
    color: 'white',
    backgroundColor: theme.palette.money.income
  },
  expense: {
    color: 'white',
    backgroundColor: theme.palette.money.expense
  }
}))

const AddEntryDialog = ({ open, onClose, onAfterSubmit }) => {
  const classes = useStyles()
  const [form, { setField, resetForm, submit }] = useForm(
    {
      description: '',
      amount: '',
      date: new Date().toISOString(),
      tags: [],
      type: 'expense'
    },
    (form) => addEntry(form)
      .then(() => () => {
        resetForm()
        onAfterSubmit()
        onClose()
      })
  )

  return (
    <Dialog
      open={open}
      TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
      aria-labelledby="simple-dialog-title"
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <Collapse in={form.type === 'income'}>
        <DialogTitle id="dialog-title" className={classes.income}>Add new income</DialogTitle>
      </Collapse>
      <Collapse in={form.type === 'expense'}>
        <DialogTitle id="dialog-title" className={classes.expense}>Add new expense</DialogTitle>
      </Collapse>
      {form.status === 'pending' && (<LinearProgress />)}
      <EntryForm
        form={form}
        onChangeField={setField}
        onSubmit={submit}
      >
        <DialogActions>
          <Button onClick={onClose} disabled={form.status !== 'ready'}>Cancel</Button>
          <Button type="submit" disabled={form.status !== 'ready'} color="primary">Add</Button>
        </DialogActions>
      </EntryForm>
    </Dialog>
  )
}

AddEntryDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAfterSubmit: PropTypes.func
}

export default AddEntryDialog
