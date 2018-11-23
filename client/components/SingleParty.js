import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {
  getParty,
  putGuestStatus,
  getGuestStatus,
  getGuests,
  getItems,
  postToCalendar,
  getImages
} from '../store'
import {GuestList, ItemList, Gallery} from '.'
import moment from 'moment'
import history from '../history'
import axios from 'axios'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Radio from '@material-ui/core/Radio'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import Create from '@material-ui/icons/Create'
import CalendarToday from '@material-ui/icons/CalendarToday'

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
  }
})

class SingleParty extends Component {
  state = {
    selectedValue: 'invited'
  }

  componentDidMount() {
    const {guestPartyToken, partyId} = this.props.match.params

    this.props.getParty(partyId)
    this.props.getGuests(partyId)
    this.props.getItems(partyId)
    this.props.getImages(partyId)

    if (guestPartyToken) this.props.getGuestStatus(guestPartyToken, partyId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.guestStatus !== prevProps.guestStatus) {
      this.setState({selectedValue: this.props.guestStatus})
    }
  }
  handleChange = event => {
    const rsvp = event.target.name
    this.setState({selectedValue: rsvp})
    const {guestPartyToken} = this.props.match.params
    this.props.putGuestStatus(guestPartyToken, rsvp)
  }

  handleAddToCalendar = async () => {
    const {loggedInUser, party, guests} = this.props
    const guest = guests.find(ele => ele.email === loggedInUser.email)
    this.props.postToCalendar(guest.id, party)
  }

  render() {
    const {
      title,
      description,
      location,
      imageUrl,
      status,
      user,
      date,
      id,
      userId
    } = this.props.party

    const {guests, items, loggedInUser, images} = this.props

    const {guestPartyToken} = this.props.match.params
    const {classes} = this.props

    const guest = guests.find(ele => ele.email === loggedInUser.email)

    if (!this.props.party.id) {
      return null
    } else {
      return (
        <Fragment>
          <Card className={classes.card}>
            <CardHeader
              action={
                <IconButton
                  onClick={() => history.push(`/parties/${id}/editparty`)}
                >
                  <Create className={classes.icon} />
                </IconButton>
              }
              title={title}
              subheader={`hosted by ${user.firstName} ${user.lastName}`}
            />
            <CardMedia className={classes.media} image={imageUrl} />
            <CardContent>
              <Typography component="p">{description}</Typography>
            </CardContent>
            <List>
              <ListItem>
                <ListItemText
                  primary={moment(date).format('MMMM Do YYYY, h:mm A')}
                />
                {loggedInUser &&
                loggedInUser.googleToken &&
                guest &&
                !guest.onGoogleCalendar ? (
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.handleAddToCalendar}>
                      <CalendarToday className={classes.icon} />
                    </IconButton>
                  </ListItemSecondaryAction>
                ) : (
                  <span />
                )}
              </ListItem>
              <ListItem>
                <ListItemText primary={location} />
              </ListItem>
              {guestPartyToken && (
                <ListItem>
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

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {`Guest List (Attending: ${
                  guests.filter(guest => guest.status === 'attending').length
                } Invited: ${guests.length})`}
              </Typography>
            </ExpansionPanelSummary>
            <GuestList guests={guests} />
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Items</Typography>
            </ExpansionPanelSummary>
            <ItemList
              items={items}
              guest={guests.find(guest => {
                return guest.guestPartyToken === guestPartyToken
              })}
            />
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Gallery</Typography>
            </ExpansionPanelSummary>
            <Gallery
              images={images}
              partyId={id}
              guest={guests.find(guest => {
                return guest.guestPartyToken === guestPartyToken
              })}
            />
          </ExpansionPanel>
        </Fragment>
      )
    }
  }
}

const mapState = state => ({
  party: state.party,
  guests: state.guests,
  items: state.items,
  guestStatus: state.guestStatus,
  loggedInUser: state.user,
  images: state.images
})

const mapDispatch = dispatch => ({
  postToCalendar: (guestId, party) => dispatch(postToCalendar(guestId, party)),
  getImages: partyId => dispatch(getImages(partyId)),
  getParty: partyId => dispatch(getParty(partyId)),
  getGuests: partyId => dispatch(getGuests(partyId)),
  getItems: partyId => dispatch(getItems(partyId)),
  putGuestStatus: (guestPartyToken, status) =>
    dispatch(putGuestStatus(guestPartyToken, status)),
  getGuestStatus: (guestPartyToken, partyId) =>
    dispatch(getGuestStatus(guestPartyToken, partyId))
})

SingleParty.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleParty))
