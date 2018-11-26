import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'

import PropTypes from 'prop-types'
import {
  TextField,
  FormControl,
  InputLabel,
  Button,
  Input,
  Typography,
  Paper,
  CssBaseline,
  Avatar,
  withStyles,
  MobileStepper,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import LockIcon from '@material-ui/icons/LockOutlined'

import {postParty} from '../store/party'

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
  }
})

class AddParty extends Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      guests: [{firstName: '', email: ''}]
    }
  }

  nextStep = () => {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const {step} = this.state
    this.setState({
      step: step - 1
    })
  }

  addGuestField = () => {
    this.setState({guests: [...this.state.guests, {firstName: '', email: ''}]})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleGuest = (index, event) => {
    let guestsCopy = this.state.guests.slice()
    guestsCopy[index][event.target.name] = event.target.value
    this.setState({guests: guestsCopy})
  }

  handleSubmit = async evt => {
    evt.preventDefault()

    const userId = this.props.user.id
    const userEmail = this.props.user.email
    const info = {...this.state, userId}

    //adds user as a guest
    const guestEmails = this.state.emails
      ? this.state.emails
          .split(',')
          .concat(userEmail)
          .map(email => email.trim())
      : [userEmail]

    await this.props.postParty({info, guestEmails})
  }
  render() {
    const {step} = this.state
    const {title, description, location, imageUrl, emails} = this.state
    const values = {title, description, location, imageUrl, emails}
    const steps = ['Feast Info', 'Add Guests', 'Add Items']

    const {classes, theme} = this.props
    return (
      <Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Feast
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            {step === 0 && (
              <Fragment>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input
                    id="title"
                    name="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input
                    name="description"
                    onChange={this.handleChange}
                    id="description"
                    value={this.state.description}
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="location">Location</InputLabel>
                  <Input
                    name="location"
                    onChange={this.handleChange}
                    id="location"
                    value={this.state.location}
                  />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                  {/* <InputLabel htmlFor="imageUrl">Image URL</InputLabel> */}
                  <Input
                    type="file"
                    name="imageUrl"
                    accept="image/png, image/jpeg"
                    onChange={this.handleUploadFile}
                    id="imageUrl"
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id="date"
                    label="Date"
                    name="date"
                    type="datetime-local"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={this.state.date}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Fragment>
            )}

            {step === 1 && (
              <List dense>
                <Button onClick={() => this.addGuestField()}>
                  Add a guest
                </Button>
                {this.state.guests.length &&
                  this.state.guests.map((guest, index) => (
                    <ListItem key={`${guest.email}`}>
                      <FormControl margin="normal">
                        <InputLabel htmlFor="guest name">Guest Name</InputLabel>
                        <Input
                          type="text"
                          name="firstName"
                          onChange={event => this.handleGuest(index, event)}
                          value={this.state.guests[index].firstName}
                        />
                      </FormControl>
                      <FormControl margin="normal">
                        <InputLabel htmlFor="location">Guest Email</InputLabel>
                        <Input
                          type="text"
                          name="email"
                          onChange={event => this.handleGuest(index, event)}
                          value={this.state.guests[index].email}
                        />
                      </FormControl>
                    </ListItem>
                  ))}
              </List>
            )}
          </form>
        </Paper>
        <MobileStepper
          variant="dots"
          steps={4}
          position="static"
          activeStep={this.state.step}
          className={classes.root}
          nextButton={
            <Button
              size="small"
              onClick={this.nextStep}
              disabled={this.state.step === 3}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.prevStep}
              disabled={this.state.step === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  postParty: partyInfo => dispatch(postParty(partyInfo))
})

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatch)(
  withStyles(styles, {withTheme: true})(AddParty)
)

AddParty.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
