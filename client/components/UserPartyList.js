import React, {Component} from 'react'
import {getParties} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {UpcomingParty, HostingParties, AttendingParties, PastParties} from '.'

// MATERIAL UI IMPORTS
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import {withStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'

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

class UserPartyList extends Component {
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
            <UpcomingParty user={user} upcomingEvent={upcomingEvent} />
            <HostingParties hosting={hosting} />
            <AttendingParties attending={attending} />
            <PastParties pastEvents={pastEvents} />
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

export default withStyles(styles)(connect(mapState, mapDispatch)(UserPartyList))
