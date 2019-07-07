import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import MoneyWrapper from 'Components/MoneyWrapper'
import CardHeader from '@material-ui/core/CardHeader'
import Status from 'Components/Status'
import Tooltip from '@material-ui/core/Tooltip'
import { formatDate } from 'utils/date'

import useGlobalState from 'hooks/useGlobalState'
import { statusPropType } from 'models/status'
import { entryPropType } from 'models/entry'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    padding: theme.spacing(4, 0),
    position: 'relative'
  },
  smallHeader: {
    fontSize: 14
  },
  card: {
    margin: theme.spacing(0, 2, 2),
    padding: theme.spacing(0, 0, 2)
  },
  noEntries: {
    fontSize: 14,
    textAlign: 'center'
  },
  listItemRight: {
    flex: '0 0 auto'
  },
  listItemLeft: {
    flex: '1 0 auto'
  },
  sectionHeader: {
    padding: theme.spacing(3, 2, 3, 4),
    boxShadow: theme.shadows[2],
    '& > *': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  sectionHeaderLeft: {
    flex: '1 0 auto'
  },
  sectionHeaderRight: {
    flex: '0 0 auto',
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.grey['100'],
    boxShadow: theme.shadows[1],
    borderRadius: '100px'
  }
}))

const Overview = ({ entries = [], status }) => {
  const classes = useStyles()

  const [, setLocation] = useGlobalState('location')

  const sum = entries.reduce((acc, entry) => acc + entry.amount, 0)

  return (
    <>
      <Container className={classes.container} maxWidth="xs">
        <Fade in={status === 'success'} timeout={500} mountOnEnter unmountOnExit>
          <div>
            {entries.length === 0 && (
              <Typography className={classes.noEntries} color="textSecondary">No entries found.</Typography>
            )}
            {entries.length > 0 && (
              <Card className={classes.card}>
                <CardHeader
                  disableTypography
                  className={classes.sectionHeader}
                  title={(
                    <>
                      <Typography variant="h5" className={classes.sectionHeaderLeft}>All entries</Typography>
                      <Typography variant="h5"><MoneyWrapper className={classes.sectionHeaderRight}>{sum}</MoneyWrapper></Typography>
                    </>
                  )}
                />
                <CardContent>
                  <List>
                    {entries.map(entry => (
                      <ListItem key={entry.id} button onClick={() => setLocation(`overview/edit/${entry.id}`)}>
                        <ListItemAvatar>
                          <Tooltip title={entry.category}>
                            <Avatar style={{ backgroundColor: entry.categoryColor }}>
                              <Typography variant="h6">{entry.category[0]}</Typography>
                            </Avatar>
                          </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.listItemLeft}
                          primary={entry.description}
                          secondary={formatDate(entry.date, 'dddd, mmmm d yyyy')}
                        />
                        <MoneyWrapper className={classes.listItemRight}>{entry.amount}</MoneyWrapper>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </div>
        </Fade>
      </Container>
      <Status error show={status === 'failed'} label="Something went wrong" />
    </>
  )
}

Overview.propTypes = {
  entries: PropTypes.arrayOf(entryPropType),
  status: statusPropType
}

export default Overview
