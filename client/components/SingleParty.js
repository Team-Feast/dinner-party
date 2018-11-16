import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchParty} from '../store'
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
    backgroundColor: theme.palette.background.paper
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

class SingleParty extends Component {
  componentDidMount() {
    this.props.fetchParty(this.props.match.params.id)
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
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={title}
              subheader={moment(date).format('MMMM Do YYYY, h:mm')}
            />
            <CardMedia className={classes.media} image={imageUrl} />
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
  party: state.party
})

const mapDispatch = dispatch => ({
  fetchParty: id => dispatch(fetchParty(id))
})

SingleParty.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleParty))
