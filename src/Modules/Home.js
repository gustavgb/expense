import React, { useState, useMemo, useCallback } from 'react'
import usePromise from 'hooks/usePromise'
import { getAllEntries, addEntry } from 'api/entries'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import getCurrentDate from 'utils/getCurrentDate'
import useForm from 'hooks/useForm'
import moment from 'moment'

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
  overviewHeader: {
    fontSize: 14
  },
  formHeader: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    '& > *': {
      color: theme.palette.primary.contrastText
    }
  },
  actions: {
    justifyContent: 'flex-end'
  },
  secondaryBtn: {
    color: theme.palette.text.secondary
  },
  input: {
    marginTop: theme.spacing(1),
    display: 'block'
  },
  card: {
    marginBottom: theme.spacing(2)
  },
  noEntries: {
    fontSize: 14,
    textAlign: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  panelDetails: {
    flexDirection: 'column'
  }
}))

const Home = () => {
  const [{ entries, sum } = {}, status, reloadData] = usePromise(getAllEntries)
  const classes = useStyles()
  const [adding, setAdding] = useState(false)
  const currentDate = useMemo(() => getCurrentDate().toISOString(), [])
  const [formStep, setFormStep] = useState(0)
  const [reachedStep, setReachedStep] = useState(0)
  const createExpandHandler = step => (event, isExpanded) => {
    setFormStep(isExpanded ? step : false)
  }

  const [{ description, amount, date, status: addStatus }, { setField, resetForm, submit }] = useForm(
    {
      description: '',
      amount: 0,
      date: currentDate,
      tags: []
    },
    (form) => addEntry(form)
      .then(() => reloadData())
      .then(() => setAdding(false))
  )

  window.getDate = () => date

  const handleNext = (event) => {
    if (formStep < 2) {
      event.preventDefault()
      setFormStep(formStep + 1)
      setReachedStep(reachedStep + 1)
    } else {
      submit(event)
    }
  }

  const handleOpenForm = useCallback(
    () => {
      resetForm()
      setAdding(true)
      setFormStep(0)
      setReachedStep(0)
    },
    []
  )

  return (
    <Container className={classes.container} maxWidth="xs">
      {status === 'pending' && (
        <CircularProgress color="primary" className={classes.progress} />
      )}
      {status === 'success' && (
        <>
          <Card className={classes.card}>
            <Collapse in={!adding} timeout={500}>
              <CardContent>
                <Typography className={classes.overviewHeader} color="textSecondary" gutterBottom>Overview</Typography>
                <Typography variant="h5">Sum: {sum}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {sum === 0 && 'You\'re even. It\'s a tie I guess.'}
                  {sum < 0 && 'Oops...'}
                  {sum > 0 && 'Keep going!'}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button onClick={handleOpenForm} className={classes.secondaryBtn}>New entry</Button>
              </CardActions>
            </Collapse>
            <Collapse in={adding} timeout={500}>
              <form onSubmit={handleNext}>
                <Paper className={classes.formHeader} >
                  <Typography variant="h6">Add new entry</Typography>
                </Paper>
                {addStatus === 'pending' && (<LinearProgress />)}
                <CardContent>
                  <ExpansionPanel expanded={formStep === 0} onChange={createExpandHandler(0)}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="add-entry-description"
                    >
                      <Typography className={classes.heading}>Description</Typography>
                      <Fade in={formStep !== 0} timeout={250}>
                        <Typography className={classes.secondaryHeading}>
                          {description || (<i>No description</i>)}
                        </Typography>
                      </Fade>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                      <Typography variant="body2" gutterBottom>
                        You're going to add a new entry. You just need to fill out some info about the expense. First describe the expense (Something like: "Ate out with friends.").
                      </Typography>
                      <TextField
                        required
                        placeholder="Enter description"
                        value={description}
                        onChange={({ target: { value } }) => setField('description', value)}
                        className={classes.input}
                        fullWidth
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  {reachedStep >= 1 && (
                    <ExpansionPanel expanded={formStep === 1} onChange={createExpandHandler(1)}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="add-entry-amount"
                      >
                        <Typography className={classes.heading}>Amount</Typography>
                        <Fade in={formStep !== 1} timeout={250}>
                          <Typography className={classes.secondaryHeading}>{parseInt(amount, 10).toFixed(2)}</Typography>
                        </Fade>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.panelDetails}>
                        <Typography variant="body2" gutterBottom>
                          Enter the amount of money you paid (2 decimals are enough).
                        </Typography>
                        <TextField
                          required
                          autoFocus
                          placeholder="Enter amount"
                          value={amount}
                          onChange={({ target: { value } }) => setField('amount', value)}
                          type="number"
                          className={classes.input}
                          fullWidth
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )}
                  {reachedStep >= 2 && (
                    <ExpansionPanel expanded={formStep === 2} onChange={createExpandHandler(2)}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="add-entry-date"
                      >
                        <Typography className={classes.heading}>Date</Typography>
                        <Fade in={formStep !== 2} timeout={250}>
                          <Typography className={classes.secondaryHeading}>
                            {moment(date).format('dddd, MMMM Do YYYY')}
                          </Typography>
                        </Fade>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.panelDetails}>
                        <Typography variant="body2" gutterBottom>
                          If you're adding something that happened before or after today, you should change the date.
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            value={date}
                            onChange={(value) => setField('date', value.toISOString())}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            className={classes.input}
                            fullWidth
                          />
                        </MuiPickersUtilsProvider>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )}
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button onClick={() => setAdding(false)} disabled={addStatus !== 'ready'}>Cancel</Button>
                  <Button type="submit" disabled={addStatus !== 'ready'} color="primary">{formStep === 2 ? 'Add' : 'Next'}</Button>
                </CardActions>
              </form>
            </Collapse>
          </Card>
          <Fade in={!adding} timeout={500} unmountOnExit mountOnEnter>
            <div>
              {entries.length === 0 && (
                <Typography className={classes.noEntries} color="textSecondary">You have no previous entries.</Typography>
              )}
              {entries.length > 0 && (
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.overviewHeader} color="textSecondary" gutterBottom>Entries</Typography>
                    <List>
                      {entries.map(entry => (
                        <ListItem key={entry.id}>
                          <ListItemAvatar>
                            <div>{entry.amount}</div>
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
        </>
      )}
    </Container>
  )
}

export default Home
