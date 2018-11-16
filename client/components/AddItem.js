import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {MenuItem, TextField, Button} from '@material-ui/core/'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {postItem} from '../store'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})
class AddItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      email: '',
      partyId: this.props.partyId
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.postItem(this.state)
  }

  render() {
    const {classes} = this.props

    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          placeholder="Item"
          name="title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          placeholder="Description"
          name="description"
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
        />

        <TextField
          placeholder="Email"
          name="email"
          className={classes.textField}
          value={this.state.email}
          type="email"
          onChange={this.handleChange}
          margin="normal"
        />
        <Button type="Submit">Add</Button>
      </form>
    )
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  partyId: state.party.id
})
const mapDispatchToProps = dispatch => ({
  postItem: item => dispatch(postItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AddItem)
)
