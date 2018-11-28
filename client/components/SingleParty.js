import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getParty, putGuest, getGuests, getItems} from '../store'
import {GuestList, ItemList, Gallery, Map, CalendarButton} from '.'
import moment from 'moment'
import history from '../history'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Create from '@material-ui/icons/Create'
import CalendarToday from '@material-ui/icons/CalendarToday'
import Event from '@material-ui/icons/Event'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import deepOrange from '@material-ui/core/colors/deepOrange'
import PlaceIcon from '@material-ui/icons/Place'
import AssignmentIcon from '@material-ui/icons/Assignment'
import GroupIcon from '@material-ui/icons/Group'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import PhotoLibrary from '@material-ui/icons/PhotoLibrary'

const toonavatar = require('cartoon-avatar')
const url = toonavatar.generate_avatar({gender: 'male'})

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  green: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  red: {
    color: red[600],
    '&$checked': {
      color: red[500]
    }
  },
  checked: {},
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatar: {
    // margin: 10,
    height: 30,
    width: 30,
    backgroundColor: deepOrange[500]
  },
  padding: {
    paddingTop: '8px',
    paddingBottom: '8px'
  }
})

class SingleParty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      date: '',
      id: '',
      userId: '',
      status: '',
      selectedValue: 'invited'
    }
  }

  async componentDidMount() {
    const {guestPartyToken, partyId} = this.props.match.params

    await this.props.getParty(partyId)
    await this.props.getGuests(partyId)
    this.props.getItems(partyId)

    if (guestPartyToken) {
      const guest = this.props.guests.find(
        ele => ele.guestPartyToken === guestPartyToken
      )

      this.setState({...this.props.party, selectedValue: guest.status})
    }
  }

  handleChange = event => {
    const status = event.target.name
    this.setState({selectedValue: status})
    const {guestPartyToken} = this.props.match.params

    const guest = this.props.guests.find(
      ele => ele.guestPartyToken === guestPartyToken
    )

    this.props.putGuest(guest.id, {status})
  }

  render() {
    const {
      title,
      description,
      location,
      imageUrl,
      user,
      date,
      id,
      userId,
      status
    } = this.state

    const {guests, items, loggedInUser, images} = this.props
    const {guestPartyToken} = this.props.match.params
    const {classes} = this.props

    const guest = guests.find(ele => ele.guestPartyToken === guestPartyToken)

    if (!this.state.id) {
      return null
    } else {
      return (
        <Fragment>
          <Card className={classes.card}>
            <CardHeader
              className={classes.padding}
              action={
                userId === loggedInUser.id && (
                  <IconButton
                    onClick={() => history.push(`/parties/${id}/editparty`)}
                  >
                    <Create className={classes.icon} />
                  </IconButton>
                )
              }
              title={title}
              subheader={`hosted by ${user.firstName} ${user.lastName}`}
            />
            <CardMedia className={classes.media} image={imageUrl} />
            <CardContent className={classes.padding}>
              <Typography component="p">{description}</Typography>
            </CardContent>
            <List>
              <ListItem className={classes.padding}>
                <ListItemText
                  primary={moment(date).format('MMMM Do YYYY, h:mm A')}
                />
                {guest && !guest.onGoogleCalendar ? (
                  <ListItemSecondaryAction>
                    <CalendarButton guest={guest} />
                  </ListItemSecondaryAction>
                ) : (
                  <Event />
                )}
              </ListItem>
              {userId !== loggedInUser.id &&
                status === 'upcoming' && (
                  <ListItem className={classes.padding}>
                    <ListItemText primary="Are you attending?" />
                    <ListItemSecondaryAction>
                      <div>
                        <Checkbox
                          checked={this.state.selectedValue === 'attending'}
                          onChange={this.handleChange}
                          value={this.state.selectedValue}
                          name="attending"
                          aria-label="C"
                          classes={{
                            root: classes.green,
                            checked: classes.checked
                          }}
                        />
                        <Checkbox
                          checked={this.state.selectedValue === 'declined'}
                          onChange={this.handleChange}
                          value={this.state.selectedValue}
                          name="declined"
                          color="primary"
                          classes={{
                            root: classes.red,
                            checked: classes.checked
                          }}
                          aria-label="D"
                        />
                      </div>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
            </List>
          </Card>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center" alignContent="center">
                <Grid item xs={2}>
                  <PlaceIcon />
                </Grid>
                <Grid item>
                  <Typography variant="body2">{location}</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Divider />
            <Map location={location} />
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <GroupIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.heading}>
                    {`Guest List (Attending: ${
                      guests.filter(guest => guest.status === 'attending')
                        .length
                    } Invited: ${guests.length})`}
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Divider />
            <GuestList guests={guests} />
          </ExpansionPanel>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <AssignmentIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.heading}>Items</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Divider />
            <ItemList
              items={items}
              guest={guests.find(guest => {
                return guest.guestPartyToken === guestPartyToken
              })}
            />
          </ExpansionPanel>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <PhotoLibrary />
                </Grid>
                <Grid item>
                  <Typography className={classes.heading}>
                    Photo Gallery
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Divider />
            <Gallery partyId={id} />
          </ExpansionPanel>

          {/* <Button
               color='primary'
               variant="contained"
               className={classes.button}
               onClick={()=> history.push(`/parties/${id}/gallery`)}
               >
              <SaveIcon />
             </Button> */}
        </Fragment>
      )
    }
  }
}

const mapState = state => ({
  party: state.party,
  guests: state.guests,
  items: state.items,
  loggedInUser: state.user
})

const mapDispatch = dispatch => ({
  getParty: partyId => dispatch(getParty(partyId)),
  getGuests: partyId => dispatch(getGuests(partyId)),
  putGuest: (guestId, status) => dispatch(putGuest(guestId, status)),
  getItems: partyId => dispatch(getItems(partyId))
})

SingleParty.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleParty))
