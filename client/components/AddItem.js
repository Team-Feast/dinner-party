import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
  MenuItem,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions
} from '@material-ui/core/'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {postItem} from '../store'

import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import Input from '@material-ui/core/Input'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
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
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})
class AddItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      partyId: this.props.partyId,
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
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
      <div>
        <Button className={classes.submit} onClick={this.handleClickOpen}>
          ADD ITEM
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.container} onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
            <FormControl>
              <Input
                autoFocus
                margin="dense"
                placeholder="Item Name"
                name="title"
                className={classes.textField}
                onChange={this.handleChange}
              />
              {/* <Input
                autoFocus
                placeholder="Description"
                name="description"
                className={classes.textField}
                onChange={this.handleChange}
                margin="dense"
              /> */}
            </FormControl>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                type="Submit"
                className={classes.submit}
              >
                Add
              </Button>
              <Button
                onClick={this.handleClose}
                type="button"
                className={classes.submit}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
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
