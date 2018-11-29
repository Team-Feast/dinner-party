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
  IconButton
} from '@material-ui/core'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import LockIcon from '@material-ui/icons/LockOutlined'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CakeIcon from '@material-ui/icons/Cake'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'

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
  },
  fileButton: {
    width: '100%',
    color: 'red'
  },
  uploadBtnWrapper: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  uploadBtnWrapperInput: {
    position: 'absolute',
    left: '0',
    top: '0',
    opacity: '0'
  },
  textField: {
    margin: 'dense'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 75
  }
})

function TransitionUp(props) {
  return <Slide {...props} direction="up" />
}
class AddParty extends Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      date: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
      guests: [{firstName: '', email: ''}],
      items: [{title: ''}],
      reminders: [{notificationType: 'email', time: 3, timeUnit: 'days'}],
      clearTimeoutVar: null,
      open: false,
      Transition: null
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

  addItemField = () => {
    this.setState({items: [...this.state.items, {title: ''}]})
  }
  addReminderField = () => {
    this.setState({
      reminders: [
        ...this.state.reminders,
        {notificationType: 'email', time: 1, timeUnit: 'days'}
      ]
    })
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleItem = (index, event) => {
    let itemsCopy = this.state.items.slice()
    itemsCopy[index][event.target.name] = event.target.value
    this.setState({items: itemsCopy})
  }
  handleReminder = (index, event) => {
    let remindersCopy = this.state.reminders.slice()
    remindersCopy[index][event.target.name] = event.target.value
    this.setState({reminders: remindersCopy})
  }

  handleGuest = (index, event) => {
    let guestsCopy = this.state.guests.slice()
    guestsCopy[index][event.target.name] = event.target.value
    this.setState({guests: guestsCopy})
  }

  handleUploadFile = async event => {
    this.showSnackbar(TransitionUp)

    const url = 'https://api.cloudinary.com/v1_1/dhgftlgcc/image/upload'
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('upload_preset', 'xlji39fe')
    formData.append('api_key', process.env.CLOUDINARY_API_KEY)
    const {data} = await axios.post(url, formData, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    this.setState({imageUrl: data.url})
  }

  handleSubmit = async evt => {
    evt.preventDefault()

    const userId = this.props.user.id
    const userFirstName = this.props.user.firstName
    const userEmail = this.props.user.email
    const host = {firstName: userFirstName, email: userEmail}

    const info = {...this.state, userId}

    //adds user as a guest
    const guests = this.state.guests ? [host, ...this.state.guests] : [host]

    console.log('you submitted')
    this.props.history.push('/DemoSuccess')
    // await this.props.postParty({info, guests})
  }

  showSnackbar = Transition => {
    this.setState({open: true, Transition})
    const clearTimeoutVar = setTimeout(() => this.setState({open: false}), 4000)
    this.setState({clearTimeoutVar})
  }

  componentWillUnmount() {
    clearTimeout(this.state.clearTimeoutVar)
  }

  render() {
    const {step} = this.state
    const {title, description, location, date} = this.state

    const {classes, theme} = this.props
    return (
      <Fragment>
        <CssBaseline />
        <Paper elevation={0} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CakeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Feast
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>
            {step === 0 && (
              <Fragment>
                <Typography component="h6" variant="h6">
                  Feast Info
                </Typography>
                <FormControl margin="dense" required fullWidth>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input
                    id="title"
                    name="title"
                    onChange={this.handleChange}
                    value={title}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="dense" required fullWidth>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input
                    name="description"
                    onChange={this.handleChange}
                    id="description"
                    value={description}
                    multiline
                  />
                </FormControl>

                <FormControl margin="dense" required fullWidth>
                  <InputLabel htmlFor="location">Address</InputLabel>
                  <Input
                    name="location"
                    onChange={this.handleChange}
                    id="location"
                    value={location}
                    multiline
                  />
                </FormControl>

                <FormControl margin="dense">
                  <TextField
                    id="date"
                    label="Date"
                    name="date"
                    type="datetime-local"
                    className={classes.textField}
                    onChange={this.handleChange}
                    required
                    value={date}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>

                <FormControl margin="dense" fullWidth>
                  <div className={classes.uploadBtnWrapper}>
                    <IconButton>
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                    <Input
                      type="file"
                      name="imageUrl"
                      className={classes.uploadBtnWrapperInput}
                      accept="image/png, image/jpeg"
                      onChange={this.handleUploadFile}
                      id="imageUrl"
                    />
                  </div>
                </FormControl>
              </Fragment>
            )}

            {step === 1 && (
              <Fragment>
                <Typography component="h6" variant="h6">
                  Invite Guests
                </Typography>
                <List dense>
                  {this.state.guests.length &&
                    this.state.guests.map((guest, index) => (
                      <ListItem key={`guest[${index}]`}>
                        <FormControl margin="dense">
                          <InputLabel htmlFor="guest name">
                            Guest Name
                          </InputLabel>
                          <Input
                            type="text"
                            name="firstName"
                            onChange={event => this.handleGuest(index, event)}
                            value={this.state.guests[index].firstName}
                          />
                        </FormControl>
                        <FormControl margin="dense">
                          <InputLabel htmlFor="location">
                            Guest Email
                          </InputLabel>
                          <Input
                            type="email"
                            name="email"
                            onChange={event => this.handleGuest(index, event)}
                            value={this.state.guests[index].email}
                          />
                        </FormControl>
                      </ListItem>
                    ))}
                  <Button onClick={() => this.addGuestField()}>
                    Add a guest
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Select from Google Contacts
                  </Button>
                </List>
              </Fragment>
            )}
            {step === 2 && (
              <Fragment>
                <Typography component="h6" variant="h6">
                  Set reminders
                </Typography>
                <List dense>
                  {this.state.reminders.length &&
                    this.state.reminders.map((reminder, index) => (
                      <ListItem key={`reminder[${index}]`}>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={reminder.notificationType}
                            onChange={event =>
                              this.handleReminder(index, event)
                            }
                            inputProps={{
                              name: 'notification',
                              id: 'notification-type'
                            }}
                          >
                            <MenuItem value="">
                              <em />
                            </MenuItem>
                            <MenuItem value={'email'}>Email</MenuItem>
                            <MenuItem value={'text'}>Text</MenuItem>
                            <MenuItem value={'both'}>Both</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                          <TextField
                            id="time"
                            name="time"
                            type="number"
                            inputProps={{
                              style: {textAlign: 'center'}
                            }}
                            className={classes.textField}
                            onChange={event =>
                              this.handleReminder(index, event)
                            }
                            required
                            value={`${reminder.time}`}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={`${reminder.timeUnit}`}
                            onChange={event =>
                              this.handleReminder(index, event)
                            }
                            inputProps={{
                              name: 'timeUnit',
                              id: 'timeUnit-type'
                            }}
                          >
                            <MenuItem value="">
                              <em />
                            </MenuItem>
                            <MenuItem value={'days'}>days</MenuItem>
                            <MenuItem value={'weeks'}>weeks</MenuItem>
                            <MenuItem value={'hours'}>hours</MenuItem>
                          </Select>
                        </FormControl>
                      </ListItem>
                    ))}
                  <Button onClick={() => this.addReminderField()}>
                    Add reminder
                  </Button>
                </List>
              </Fragment>
            )}
            {step === 3 && (
              <Fragment>
                <Typography component="h6" variant="h6">
                  Items for guests to bring
                </Typography>
                <List dense>
                  {this.state.items.length &&
                    this.state.items.map((item, index) => (
                      <ListItem key={`item[${index}]`}>
                        <FormControl margin="dense" fullWidth>
                          <InputLabel htmlFor="Item title">Item</InputLabel>
                          <Input
                            type="text"
                            name="title"
                            onChange={event => this.handleItem(index, event)}
                            value={this.state.items[index].title}
                          />
                        </FormControl>
                      </ListItem>
                    ))}
                  <Button onClick={() => this.addItemField()}>
                    Add new item
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create Feast
                  </Button>
                </List>
              </Fragment>
            )}
          </form>
        </Paper>
        <MobileStepper
          variant="dots"
          steps={4}
          position="bottom"
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

        <Snackbar
          open={this.state.open}
          // onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Your photo was uploaded!</span>}
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
