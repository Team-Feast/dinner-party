import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import {withStyles} from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  media: {
    height: 50
  }
}

class Navbar extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {classes} = this.props
    const {anchorEl} = this.state
    const open = Boolean(anchorEl)

    return (
      <Fragment>
        <CssBaseline />
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <Grid container justify="space-between">
              <Grid item>
                <img className={classes.media} src="/images/logo-full.jpg" />
              </Grid>
              <Grid item>
                <IconButton
                  aria-owns={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({TransitionProps, placement}) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            {this.props.isLoggedIn ? (
                              <div>
                                <MenuItem onClick={this.handleClose}>
                                  <Link to="/">Home</Link>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                  <Link to="/home">My Events</Link>
                                </MenuItem>
                                <MenuItem onClick={this.props.handleLogout}>
                                  Logout
                                </MenuItem>
                              </div>
                            ) : (
                              <div>
                                <MenuItem onClick={this.handleClose}>
                                  <Link to="/">Home</Link>
                                </MenuItem>
                                <MenuItem onClick={this.props.handleClick}>
                                  Login
                                </MenuItem>
                                <MenuItem onClick={this.props.handleClick}>
                                  Signup
                                </MenuItem>
                              </div>
                            )}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))
