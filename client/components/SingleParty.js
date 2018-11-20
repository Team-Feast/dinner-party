import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {
  getParty,
  putGuestStatus,
  getGuestStatus,
  getGuests,
  getItems
} from '../store'
import {GuestList, ItemList} from '../components'
import moment from 'moment'

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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import green from '@material-ui/core/colors/green'
import Radio from '@material-ui/core/Radio'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },

  checked: {}
})

class SingleParty extends Component {
  state = {
    selectedValue: this.props.guestStatus
  }

  componentDidMount() {
    const {guestPartyToken, partyId} = this.props.match.params

    this.props.getParty(partyId)
    this.props.getGuests(partyId)
    this.props.getItems(partyId)

    if (guestPartyToken) this.props.getGuestStatus(guestPartyToken, partyId)
  }
  handleChange = event => {
    const rsvp = event.target.value
    this.setState({selectedValue: rsvp})
    const {guestPartyToken} = this.props.match.params
    this.props.putGuestStatus(guestPartyToken, rsvp)
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

    const {guests, items, loggedInUser} = this.props

    const {guestPartyToken} = this.props.match.params
    const {classes} = this.props

    if (!this.props.party.id) {
      return null
    } else {
      return (
        <Fragment>
          <Card className={classes.card}>
            <CardHeader
              title={title}
              subheader={`hosted by ${user.firstName} ${user.lastName}`}
            />
            {imageUrl && (
              <CardMedia className={classes.media} image={imageUrl} />
            )}
            <CardContent>
              <Typography component="p">{description}</Typography>
            </CardContent>
            <List>
              <ListItem button>
                <ListItemText
                  primary={moment(date).format('MMMM Do YYYY, h:mm A')}
                  secondary={location}
                />
              </ListItem>
              {(userId === loggedInUser.id || guestPartyToken) && (
                <ListItem>
                  <ListItemText primary="Are you attending?" />
                  <ListItemSecondaryAction>
                    <div>
                      <Radio
                        checked={this.state.selectedValue === 'attending'}
                        onChange={this.handleChange}
                        value="attending"
                        name="radio-button-demo"
                        aria-label="C"
                        classes={{
                          root: classes.root,
                          checked: classes.checked
                        }}
                      />
                      <Radio
                        checked={this.state.selectedValue === 'declined'}
                        onChange={this.handleChange}
                        value="declined"
                        color="default"
                        name="radio-button-demo"
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
  loggedInUser: state.user
})

const mapDispatch = dispatch => ({
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
