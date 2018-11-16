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
    selectedValue: 'a',
    status: null
  }
  componentDidMount() {
    this.props.fetchParty(this.props.match.params.id)
    console.log('math prop', this.props.match)

    console.log('guest party token', this.props.match.params.guestPartyToken)
    const {guestPartyToken} = this.props.match.params
    this.props.fetchGuestStatus(guestPartyToken)
  }
  handleChange = event => {
    console.log('value', event.target.value)

    this.setState({selectedValue: event.target.value})
    const {guestPartyToken} = this.props.match.params
    this.props.putGuestStatus(guestPartyToken)
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
          {/* <img width="360" src={imageUrl} />
          <h3>{title}</h3>
          <h5>Date: {moment(date).format('MMMM Do YYYY, h:mm')}</h5>
          <h5>Location: {location}</h5>
          <p>{description}</p>
          <Button className={classes.button} onClick={this.toggleGuestList}>
            {`Guest List (${guests.length})`}
          </Button>
          <Button className={classes.button} onClick={this.toggleItemList}>
            Item List
          </Button>

          {this.state.showGuestList && <GuestList guests={guests} />}
          {this.state.showItemList && <ItemList items={items} partyId={id} />}
          <image /> */}
          <Card className={classes.card}>
            <CardHeader
              title={title}
              subheader={moment(date).format('MMMM Do YYYY, h:mm')}
            />
            <CardMedia className={classes.media} image={imageUrl} />
<<<<<<< HEAD
            {/* <List>
              <ListItem >

              </ListItem>
            </List> */}
=======
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
                      value="c"
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
                      value="d"
                      color="default"
                      name="radio-button-demo"
                      aria-label="D"
                    />
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
>>>>>>> 336bc95bedb8bd3042f270645289f31e2c879d62
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
  fetchGuestStatus: guestPartyToken =>
    dispatch(fetchGuestStatus(guestPartyToken))
})

SingleParty.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleParty))
