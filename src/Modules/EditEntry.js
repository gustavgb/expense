import React, { useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { entryPropType } from 'models/entry'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import EntryForm from 'Components/EntryForm'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'

import useGlobalState from 'hooks/useGlobalState'
import { saveEntry, deleteEntry } from 'api/entries'
import useForm from 'hooks/useForm'

const useStyles = makeStyles({
  headerIcon: {
    float: 'right'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

const EditEntryDialog = ({ open, onClose, onAfterSubmit, entries }) => {
  const classes = useStyles()
  const [lastOpen, setLastOpen] = useState(false)
  const [location] = useGlobalState('location') || ''

  const id = open ? location.split('/')[2] : ''
  const initialFields = useMemo(() => {
    const entry = (entries.find(entry => entry.id === id) || {})
    return {
      description: '',
      amount: '',
      date: new Date().toISOString(),
      tags: [],
      ...entry
    }
  }, [entries.length, id, open])

  const [form, { setField, resetForm, submit }] = useForm(
    initialFields,
    (form) => saveEntry(form)
      .then(() => () => {
        onAfterSubmit()
        onClose()
      })
  )

  const handleDelete = useCallback((id) => {
    deleteEntry(id)
      .then(() => {
        onAfterSubmit()
        onClose()
      })
  }, [])

  if (open && !lastOpen) {
    resetForm()
  }
  if (open !== lastOpen) {
    setLastOpen(open)
  }

  return (
    <Dialog
      open={open}
      TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
      aria-labelledby="simple-dialog-title"
      onClose={onClose}
    >
      <DialogTitle id="simple-dialog-title">
        <div className={classes.header}>
          Edit entry
          <IconButton className={classes.headerIcon} onClick={() => handleDelete(form.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </DialogTitle>
      {form.status === 'pending' && (<LinearProgress />)}
      <EntryForm
        form={form}
        onChangeField={setField}
        onSubmit={submit}
      >
        <DialogActions>
          <Button onClick={onClose} disabled={form.status !== 'ready'}>Cancel</Button>
          <Button type="submit" disabled={form.status !== 'ready'} color="primary">Save</Button>
        </DialogActions>
      </EntryForm>
    </Dialog>
  )
}

EditEntryDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAfterSubmit: PropTypes.func,
  entries: PropTypes.arrayOf(entryPropType)
}

export default EditEntryDialog
