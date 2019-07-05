import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import EntryForm from 'Components/EntryForm'

import { addEntry } from 'api/entries'
import useForm from 'hooks/useForm'

const AddEntryDialog = ({ open, onClose, onAfterSubmit }) => {
  const [form, { setField, resetForm, submit }] = useForm(
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

  return (
    <Dialog
      open={open}
      TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
      aria-labelledby="simple-dialog-title"
      onClose={onClose}
    >
      <DialogTitle id="simple-dialog-title">Add new entry</DialogTitle>
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
