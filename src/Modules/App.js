/* globals firebase */

import React, { useState, useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Overview from 'Modules/Overview'
import Login from 'Modules/Login'
import AddEntry from 'Modules/AddEntry'
import EditEntry from 'Modules/EditEntry'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Navigation from 'Components/Navigation'
import FilterMenu from 'Components/FilterMenu'

import { getCurrentInterval } from 'utils/date'
import usePromise from 'hooks/usePromise'
import { getAllEntries } from 'api/entries'
import useGlobalState from 'hooks/useGlobalState'
import { clearCache } from 'utils/cache'

const useStyles = makeStyles(theme => ({
  fabContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    '& > *': {
      marginTop: theme.spacing(1.5),
      '&:first-child': {
        marginTop: 0
      }
    }
  }
}))

const App = () => {
  const classes = useStyles()
  const [location = '', setLocation] = useGlobalState('location')
  const [dateOffset, setDateOffset] = useState(0)
  const currentInterval = useMemo(() => getCurrentInterval(dateOffset), [dateOffset])
  const [entries = [], status, reloadData] = usePromise(() => getAllEntries(currentInterval), { autoLoad: false })

  useEffect(() => {
    reloadData()
  }, [dateOffset])

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      reloadData()
      clearCache()
      setDateOffset(0)
    })
  }, [])

  const isLogin = location.includes('login')
  const isOverview = location.includes('overview')

  return (
    <div>
      <CssBaseline />
      <Navigation
        show={!isLogin}
        currentInterval={currentInterval}
        setDateOffset={setDateOffset}
        dateOffset={dateOffset}
      />
      {isLogin && (<Login />)}
      {isOverview && (
        <Overview
          entries={entries}
          status={status}
        />
      )}
      {isOverview && (
        <>
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
          <div className={classes.fabContainer}>
            <FilterMenu />
            <Fab color="secondary" aria-label="Add" onClick={() => setLocation('overview/add')}>
              <AddIcon />
            </Fab>
          </div>
        </>
      )}
    </div>
  )
}

export default App
