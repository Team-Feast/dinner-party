import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core'

import {createParty} from '../store/party'

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

const AddParty = (props) => {

  const {classes} = props

  return (
      <Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Event
          </Typography>
          <form className={classes.form} onSubmit={props.handleSubmit}>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input name="description" id="description" />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="address">Address</InputLabel>
            <Input name="address"  id="address" />
          </FormControl>

        <FormControl>
          <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
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

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const title = evt.target.title.value
      const description = evt.target.description.value
      const address = evt.target.address.value
      const date = evt.target.date.value
      const info = {title, description, address, date}
      dispatch(createParty(info))
    }
  }
}

export default connect(null, mapDispatch)(withStyles(styles)(AddParty))

AddParty.propTypes = {
  classes: PropTypes.object.isRequired
}
