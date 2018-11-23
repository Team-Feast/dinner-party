import React, {Component} from 'react'
import {getParties} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {UpcomingEvent} from '../components'

// MATERIAL UI IMPORTS
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/Add'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Create from '@material-ui/icons/Create'

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  icon: {
    margin: theme.spacing.unit
    // fontSize: 32
  },
  details: {
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
})

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

class AllParties extends Component {
  state = {
    category: ''
  }

  componentDidMount() {
    this.props.getParties(this.props.user.id)
  }

  render() {
    const {classes, parties, user} = this.props
    const {upcomingEvent, hosting, attending, pastEvents} = parties

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            <UpcomingEvent user={user} upcomingEvent={upcomingEvent} />
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <Grid item>
                <Button
                  component={Link}
                  to="/addparty"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Create Feast!
                </Button>
              </Grid>
            </Grid>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Feasts you're hosting
                </Typography>
              </ExpansionPanelSummary>
              {hosting &&
                hosting.length && (
                  <List dense>
                    {hosting.map(party => (
                      <ListItem
                        key={party.id}
                        button
                        component={Link}
                        to={`/parties/${party.id}`}
                      >
                        <Grid container alignItems="center">
                          <Grid item xs={2}>
                            <Avatar src={`${party.imageUrl}`} />
                          </Grid>
                          <Grid item xs={4}>
                            <ListItemText primary={`${party.title}`} />
                          </Grid>
                          <Grid item>
                            <ListItemText
                              secondary={`${moment(party.date).format(
                                'ddd, MMM DD, YYYY h:mm A'
                              )}`}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                )}
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Feasts you're attending
                </Typography>
              </ExpansionPanelSummary>
              {attending &&
                attending.length && (
                  <List dense>
                    {attending.map(party => (
                      <ListItem
                        key={party.id}
                        button
                        component={Link}
                        to={`/parties/${party.id}`}
                      >
                        <Grid container alignItems="center">
                          <Grid item xs={2}>
                            <Avatar src={`${party.imageUrl}`} />
                          </Grid>

                          <Grid item xs={4}>
                            <ListItemText
                              primary={`${party.title}`}
                              secondary={`${party.user.firstName} ${
                                party.user.lastName
                              }`}
                            />
                          </Grid>
                          <Grid item>
                            <ListItemText
                              secondary={`${moment(party.date).format(
                                'ddd, MMM DD, YYYY h:mm A'
                              )}`}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                )}
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Past feasts</Typography>
              </ExpansionPanelSummary>
              {pastEvents &&
                pastEvents.length && (
                  <List dense>
                    {pastEvents.map(party => (
                      <ListItem
                        key={party.id}
                        button
                        component={Link}
                        to={`/parties/${party.id}`}
                      >
                        <Grid container alignItems="center">
                          <Grid item xs={2}>
                            <Avatar src={`${party.imageUrl}`} />
                          </Grid>
                          <Grid item xs={4}>
                            <ListItemText
                              primary={`${party.title}`}
                              secondary={`${party.user.firstName} ${
                                party.user.lastName
                              }`}
                            />
                          </Grid>
                          <Grid item>
                            <ListItemText
                              secondary={`${moment(party.date).format(
                                'ddd, MMM DD, YYYY h:mm A'
                              )}`}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                )}
            </ExpansionPanel>
          </div>
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getParties: userId => {
      dispatch(getParties(userId))
    }
  }
}

const mapState = state => {
  const {parties, user} = state
  return {
    parties,
    user
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AllParties))
