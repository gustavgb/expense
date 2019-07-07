import React, { useState } from 'react'
import useGlobalState from 'hooks/useGlobalState'

import Fab from '@material-ui/core/Fab'
import FilterIcon from '@material-ui/icons/FilterList'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

const FilterBar = () => {
  const [currentFilter, setFilter] = useGlobalState('filter', { persist: true })
  const [open, setOpen] = useState(false)

  function handleClick () {
    setOpen(true)
  }

  function handleClose () {
    setOpen(false)
  }

  function handleChangeFilter (filter) {
    setFilter(filter)
    handleClose()
  }

  const filters = [
    { id: 'group_none', label: 'No grouping' },
    { id: 'group_category', label: 'Group by category' }
  ]

  return (
    <>
      <Fab aria-label="Open filters" onClick={handleClick}>
        <FilterIcon />
      </Fab>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Choose filter</DialogTitle>
        <List>
          {filters.map(filter => (
            <ListItem
              key={filter.id}
              button
              onClick={() => handleChangeFilter(filter.id)}
              selected={filter.id === currentFilter}
            >
              <ListItemText primary={filter.label} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  )
}

export default FilterBar
