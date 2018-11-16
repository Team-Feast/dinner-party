import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchParty, putGuestStatus, fetchGuestStatus} from '../store'
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
    this.props.fetchParty(partyId)

    this.props.fetchGuestStatus(guestPartyToken, partyId)
  }
  handleChange = event => {
    this.setState({selectedValue: event.target.value})
    const {guestPartyToken} = this.props.match.params
    this.props.putGuestStatus(guestPartyToken, this.state.selectedValue)
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
      guests,
      items,
      id
    } = this.props.party

    const {classes} = this.props

    if (!this.props.party.id) {
      return null
    } else {
      return (
        <Fragment>
          <Card className={classes.card}>
            <CardHeader
              title={title}
              subheader={moment(date).format('MMMM Do YYYY, h:mm')}
            />
            <CardMedia className={classes.media} image={imageUrl} />
            <List>
              <ListItem button>
                <ListItemText primary={location} />
              </ListItem>

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
            <ItemList items={items} />
          </ExpansionPanel>
        </Fragment>
      )
    }
  }
}

const mapState = state => ({
  party: state.party,
  guestStatus: state.guestStatus
})

const mapDispatch = dispatch => ({
  fetchParty: id => dispatch(fetchParty(id)),
  putGuestStatus: guestPartyToken => dispatch(putGuestStatus(guestPartyToken)),
  fetchGuestStatus: (guestPartyToken, partyId) =>
    dispatch(fetchGuestStatus(guestPartyToken, partyId))
})

SingleParty.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleParty))
