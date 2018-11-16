import React, {Component} from 'react'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
})

const ranges = [
  {
    value: 'draft',
    label: 'Draft'
  },
  {
    value: 'upcomming',
    label: 'Upcomming'
  },
  {
    value: 'cancelled',
    label: 'Cancelled'
  },
  {
    value: 'completed',
    label: 'Completed'
  }
]

class AddParty extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      time: '',
      address: '',
      description: '',
      status: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
    console.log('Updating State', this.state)
  }

  render() {
    const {classes} = this.props
    const TodayDate = new Date()
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Title"
          id="simple-start-adornment"
          onChange={this.handleChange('title')}
          className={classNames(classes.margin, classes.textField)}
        />

        <TextField
          select
          label="Status"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.status}
          onChange={this.handleChange('status')}
          InputProps={{
            startAdornment: <InputAdornment position="start" />
          }}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Address"
          id="adornment-amount"
          onChange={this.handleChange('address')}
          className={classNames(classes.margin, classes.textField)}
        />

        <TextField
          fullWidth
          label="Description"
          id="adornment-amount"
          onChange={this.handleChange('description')}
          className={classNames(classes.margin, classes.textField)}
        />

        <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue= {TodayDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  //  createParty: (partyInfo) => dispatch(createParty(partyInfo))
})

export default withStyles(styles)(connect(null, mapDispatch)(AddParty))
