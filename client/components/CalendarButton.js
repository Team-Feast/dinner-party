import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'

import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core/'
import CalendarToday from '@material-ui/icons/CalendarToday'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {postItem, postToCalendar} from '../store'

import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})
class CalendarButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleAddToCalendar = () => {
    const {party, guest} = this.props
    this.props.postToCalendar(guest.id, party)
  }

  render() {
    const {classes, loggedInUser, guest} = this.props

    return (
      <div>
        <IconButton
          color="primary"
          variant="contained"
          onClick={
            loggedInUser && loggedInUser.googleToken
              ? this.handleAddToCalendar
              : this.handleClickOpen
          }
        >
          <CalendarToday />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.container} onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">
              Add To Google Calendar
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You'll need to sign-in with Google to perform this action
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                href={`/auth/google?redirect=/parties/${guest.partyId}/rsvp/${
                  guest.guestPartyToken
                }`}
                type="Submit"
              >
                Sign-In
              </Button>
              <Button onClick={this.handleClose} type="Submit">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

CalendarButton.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  party: state.party,
  loggedInUser: state.user
})

const mapDispatchToProps = dispatch => ({
  postItem: item => dispatch(postItem(item)),
  postToCalendar: (guestId, party) => dispatch(postToCalendar(guestId, party))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CalendarButton)
)
