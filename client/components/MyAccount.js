import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'

//import {getParty, getGuests, deleteGuest, putParty} from '../store/'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  icon: {
    margin: theme.spacing.unit
  }
})

class MyAccount extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('handling edit', this.state)
    //this.props.putParty(this.state)
  }

  handleDelete() {
    console.log('handling delete', this.state)
  }

  render() {
    const {classes, user, isOAuth} = this.props

    return (
      <Fragment>
        <CssBaseline />

        <CardMedia image={user.imageUrl} />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Welcome, {user.firstName}
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <Input
                id="firstName"
                label="firstName"
                name="firstName"
                onChange={this.handleChange}
                placeholder={user.firstName}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <Input
                id="lastName"
                label="lastName"
                name="lastName"
                placeholder={user.lastName}
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <Input
                id="email"
                label="email"
                name="email"
                placeholder={user.email}
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <Input
                id="phone"
                label="phone"
                name="phone"
                placeholder={user.phone}
                onChange={this.handleChange}
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
            {isOAuth ? (
              <span />
            ) : (
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href="/auth/google"
              >
                Connect to Google
              </Button>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={this.handleDelete}
            >
              Delete Account
            </Button>
          </form>
        </Paper>
      </Fragment>
    )
  }
}

const mapState = state => ({
  user: state.user,
  isOAuth: !!state.user.googleId
})

const mapDispatch = dispatch => ({
  deleteUser: userId => dispatch(userId),
  putUser: user => dispatch(user)
})

export default connect(mapState, mapDispatch)(withStyles(styles)(MyAccount))

MyAccount.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}
