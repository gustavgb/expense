import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import MoneyWrapper from 'Components/MoneyWrapper'
import moment from 'moment'

import { statusPropType } from 'models/status'
import { entryPropType } from 'models/entry'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    minHeight: '100vh',
    padding: theme.spacing(2),
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)'
  },
  smallHeader: {
    fontSize: 14
  },
  card: {
    marginBottom: theme.spacing(2)
  },
  noEntries: {
    fontSize: 14,
    textAlign: 'center'
  }
}))

const Overview = ({ entries, status }) => {
  const classes = useStyles()

  return (
    <Container className={classes.container} maxWidth="xs">
      {status === 'pending' && (
        <CircularProgress color="primary" className={classes.progress} />
      )}
      {status === 'success' && (
        <Fade in timeout={500}>
          <div>
            {entries.length === 0 && (
              <Typography className={classes.noEntries} color="textSecondary">You have no previous entries.</Typography>
            )}
            {entries.length > 0 && (
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.smallHeader} color="textSecondary" gutterBottom>Entries</Typography>
                  <List>
                    {entries.map(entry => (
                      <ListItem key={entry.id}>
                        <ListItemAvatar>
                          <MoneyWrapper>{entry.amount}</MoneyWrapper>
                        </ListItemAvatar>
                        <ListItemText
                          primary={entry.description}
                          secondary={moment(entry.date).format('dddd, MMMM Do YYYY')}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </div>
        </Fade>
      )}
    </Container>
  )
}

Overview.propTypes = {
  entries: PropTypes.arrayOf(entryPropType),
  status: statusPropType
}

export default Overview
