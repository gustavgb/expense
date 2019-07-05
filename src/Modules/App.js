import React from 'react'
import { makeStyles } from '@material-ui/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Overview from 'Modules/Overview'
import Login from 'Modules/Login'
import AddEntry from 'Modules/AddEntry'
import EditEntry from 'Modules/EditEntry'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Navigation from 'Components/Navigation'

import usePromise from 'hooks/usePromise'
import { getAllEntries } from 'api/entries'
import useGlobalState from 'hooks/useGlobalState'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5)
  }
}))

const App = () => {
  const classes = useStyles()
  const [location = '', setLocation] = useGlobalState('location')
  const [entries = [], status, reloadData] = usePromise(getAllEntries)

  return (
    <div>
      <CssBaseline />
      <Navigation show={!location.includes('login')} />
      {location.includes('login') && (<Login />)}
      {location.includes('overview') && (
        <Overview
          entries={entries}
          status={status}
        />
      )}
      <AddEntry
        open={location.includes('overview/add')}
        onClose={() => setLocation('overview')}
        onAfterSubmit={reloadData}
      />
      <EditEntry
        open={location.includes('overview/edit')}
        onClose={() => setLocation('overview')}
        onAfterSubmit={reloadData}
        entries={entries}
      />
      <Fab color="secondary" aria-label="Add" className={classes.fab} onClick={() => setLocation('overview/add')}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default App
