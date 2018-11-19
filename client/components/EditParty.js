import React, { Component, Fragment } from 'react';
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
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

import {getParty} from '../store/party'

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

class EditParty extends Component {

  componentDidMount(){
    const id = this.props.match.params
    console.log("Here", id)
    this.props.getParty(2)

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
            Edit Event
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input id="description" name="description" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="location">Location</InputLabel>
            <Input id="location" name="location" autoFocus />
          </FormControl>

          <FormControl>
              <TextField
                id="date"
                label="Date"
                type="datetime-local"
                defaultValue={moment(Date.now()).format('YYYY-MM-DDTHH:mm')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
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
    );
  }
}

// const mapState = state => ({

// })

const mapDispatch = dispatch => ({
  getParty: partyId => dispatch(getParty(partyId))
})

export default connect(null, mapDispatch)(
  withStyles(styles)(EditParty)
)

EditParty.PropTypes = {
  classes: PropTypes.object.isRequired
}
