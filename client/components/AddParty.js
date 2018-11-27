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
  withStyles
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined'

import {postParty} from '../store/party'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
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
      title: '',
      description: '',
      location: '',
      emails: '',
      date: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
      imageUrl: ''
    }
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

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleUploadFile = async event => {
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

  render() {
    const {classes} = this.props
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
              <InputLabel htmlFor="imageUrl">Image URL</InputLabel>
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
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="location">
                Guest Emails (separated by , )
              </InputLabel>
              <Input
                type="text"
                name="emails"
                id="emails"
                onChange={this.handleChange}
                value={this.state.emails}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
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
  withStyles(styles)(AddParty)
)

AddParty.propTypes = {
  classes: PropTypes.object.isRequired
}
