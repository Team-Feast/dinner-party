import React, {Component} from 'react'
import {getParties} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import history from '../history'

// MATERIAL UI IMPORTS
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
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
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
    const {classes, parties} = this.props

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            {parties.upcomingEventToHost.id && (
              <React.Fragment>
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    Upcoming feast you're hosting
                  </Typography>
                </Toolbar>
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() =>
                          history.push(
                            `/parties/${
                              this.props.parties.upcomingEventToHost.id
                            }/editparty`
                          )
                        }
                      >
                        <Create className={classes.icon} />
                      </IconButton>
                    }
                    title={parties.upcomingEventToHost.title}
                    subheader={moment(parties.upcomingEventToHost.date).format(
                      'LLLL'
                    )}
                  />
                  <CardMedia
                    className={classes.media}
                    image={parties.upcomingEventToHost.imageUrl}
                  />
                  <CardContent>
                    <Typography component="p">
                      {parties.upcomingEventToHost.description}
                    </Typography>
                  </CardContent>
                </Card>
              </React.Fragment>
            )}
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Feasts you're hosting
                </Typography>
              </ExpansionPanelSummary>
              {parties.hosting &&
                parties.hosting.length && (
                  <List dense>
                    {parties.hosting.map(party => (
                      <ListItem
                        key={party.id}
                        button
                        component={Link}
                        to={`/parties/${party.id}`}
                      >
                        <Avatar src={`${party.imageUrl}`} />
                        <ListItemText primary={`${party.title}`} />
                        <ListItemText
                          secondary={`${moment(party.date).format('LLLL')}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() =>
                              history.push(`/parties/${party.id}/editparty`)
                            }
                          >
                            <Create className={classes.icon} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )
              // <ExpansionPanelDetails key={party.id}>
              //   <Typography>{party.description}</Typography>
              // </ExpansionPanelDetails>
              }
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Feasts you're attending
                </Typography>
              </ExpansionPanelSummary>
              {parties.attending &&
                parties.attending.length && (
                  <List dense>
                    {parties.attending.map(party => (
                      <ListItem
                        key={party.party.id}
                        button
                        component={Link}
                        to={`/parties/${party.partyId}`}
                      >
                        <Avatar src={`${party.party.imageUrl}`} />
                        <ListItemText primary={`${party.party.title}`} />
                        <ListItemText
                          secondary={`${moment(party.party.date).format(
                            'LLLL'
                          )}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Past feasts</Typography>
              </ExpansionPanelSummary>
              {parties.pastEvents &&
                parties.pastEvents.length && (
                  <List dense>
                    {parties.pastEvents.map(party => (
                      <ListItem
                        key={party.id}
                        button
                        component={Link}
                        to={`/parties/${party.id}`}
                      >
                        <Avatar src={`${party.imageUrl}`} />
                        <ListItemText primary={`${party.title}`} />
                        <ListItemText
                          secondary={`${moment(party.date).format('LLLL')}`}
                        />
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
