import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
})

class ForgotPassword extends Component {
  handleSubmit = event => {
    event.preventDefault()
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
            Forgot Password
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
            name={name}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SEND EMAIL
            </Button>
          </form>
        </Paper>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ForgotPassword)
