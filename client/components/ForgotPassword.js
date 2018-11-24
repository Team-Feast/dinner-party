import React from 'react'
import {connect} from 'react-redux'
import {postForgotPassword} from '../store'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class ForgotPassword extends React.Component {
  state = {
    open: false,
    email: ''
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleClose = () => {
    this.setState({open: false})
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.postForgotPassword({email: this.state.email})
  }
  render() {
    const {classes, status} = this.props

    return (
      <div>
        <Button className={classes.submit} onClick={this.handleClickOpen}>
          Forgot Password
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your email to reset your password.
              </DialogContentText>
              <FormControl>
                <Input
                  autoFocus
                  margin="dense"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  value={this.state.email}
                  label="Email Address"
                  type="email"
                  fullWidth
                />
              </FormControl>
              <Typography>{status && status.data && status.data}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postForgotPassword: email => dispatch(postForgotPassword(email))
})

const mapStateToProps = state => ({status: state.password.status})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ForgotPassword)
)
