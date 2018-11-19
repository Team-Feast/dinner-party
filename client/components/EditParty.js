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
import {getParty, getGuests} from '../store/'


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
  constructor(){
    super()
    this.state = {
      title: '',
      description: '',
      location: '',
      date: ''
    }
  }

  componentDidMount(){
    const id = Number(this.props.match.params.id)
    this.props.getParty(id)
    this.props.getGuests(id)
  }

  handleChange = name => event =>{
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const {classes} = this.props
    const {party} = this.props
    console.log("in the component", this.props)
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
            <Input id="title" name="title"
            value={party.title}
            onChange={this.handleChange('title')}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
            id="description"
            name="description"
            value={party.description}
            onChange={this.handleChange('description')}
            />
          </FormControl>

          <FormControl  fullWidth>
            {/* <InputLabel htmlFor="location">Location</InputLabel> */}
            <TextField
                id="location"
                label="location"
                className={classes.textField}
                value={party.location}  />
          </FormControl>

          <FormControl>
              <TextField
                id="date"
                label="Date"
                type="datetime-local"
                onChange={this.handleChange('date')}
                defaultValue={moment(party.date).format('YYYY-MM-DDTHH:mm')}
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

const mapState = state => ({
  party: state.party,
  guests: state.guests
})

const mapDispatch = dispatch => ({
  getParty: partyId => dispatch(getParty(partyId)),
  getGuests: partyId => dispatch(getGuests(partyId))

})

export default connect(mapState, mapDispatch)(
  withStyles(styles)(EditParty)
)

EditParty.PropTypes = {
  classes: PropTypes.object.isRequired
}
