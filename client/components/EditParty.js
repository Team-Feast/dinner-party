import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import LockIcon from '@material-ui/icons/LockOutlined'
import Avatar from '@material-ui/core/Avatar'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import CardMedia from '@material-ui/core/CardMedia'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

import {getParty, getGuests, deleteGuest, putParty} from '../store/'
import {isThisSecond} from 'date-fns'
import {CardHeader} from 'material-ui'

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
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

class EditParty extends Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      title: '',
      description: '',
      location: '',
      date: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(isThisSecond)
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getParty(id)
    this.props.getGuests(id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.party !== this.props.party) {
      this.setState({
        id: this.props.party.id,
        title: this.props.party.title,
        description: this.props.party.description,
        location: this.props.party.location,
        date: this.props.party.date
      })
    }
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.putParty(this.state)
  }

  handleDelete(guestId) {
    console.log('hadeling delete', guestId)
  }

  render() {
    const {classes} = this.props
    const {party} = this.props
    return (
      <Fragment>
        <CssBaseline />

        <CardMedia image={party.imageUrl} />
        <Paper elevation={0} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Event
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              {/* <InputLabel htmlFor="title">Title</InputLabel> */}
              <Input
                id="title"
                label="title"
                name="title"
                onChange={this.handleChange}
                placeholder={party.title}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              {/* <InputLabel htmlFor="description">Description</InputLabel> */}
              <Input
                id="description"
                label="description"
                name="description"
                placeholder={party.description}
                // value={party.description || ''}
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              {/* <InputLabel htmlFor="location">Location</InputLabel> */}
              <Input
                id="location"
                label="location"
                name="location"
                // value={party.location || ''}
                placeholder={party.location}
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="date"
                label="Date"
                type="datetime-local"
                onChange={this.handleChange}
                defaultValue={moment(party.date).format('YYYY-MM-DDTHH:mm')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>GUESTS</Typography>
              </ExpansionPanelSummary>
              {this.props.guests.map(guest => (
                <ExpansionPanelDetails key={guest.id}>
                  <TextField
                    key={guest.id}
                    className={classes.textField}
                    // value={guest.email}
                    placeholder={guest.email}
                  />
                  <IconButton onClick={this.handleDelete(guest.id)}>
                    <Delete className={classes.icon} />
                  </IconButton>
                </ExpansionPanelDetails>
              ))}
            </ExpansionPanel>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Delete
            </Button>
          </form>
        </Paper>
      </Fragment>
    )
  }
}

const mapState = state => ({
  party: state.party,
  guests: state.guests
})

const mapDispatch = dispatch => ({
  getParty: partyId => dispatch(getParty(partyId)),
  getGuests: partyId => dispatch(getGuests(partyId)),
  deleteGuest: guestId => dispatch(deleteGuest(guestId)),
  putParty: party => dispatch(putParty(party))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(EditParty))

EditParty.PropTypes = {
  classes: PropTypes.object.isRequired
}
