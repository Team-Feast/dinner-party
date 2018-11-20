import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'

const styles = {}

class Landing extends Component {
  state = {}

  handleClick = event => {}

  render() {
    const {classes, user} = this.props

    return (
      <Fragment>
        <CssBaseline />
        <div
          style={{
            background:
              'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(/images/landing-background.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            height: '100vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'primary'
          }}
        >
          <Grid
            container
            className={classes.root}
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            <Grid item>
              <Typography component="h1" variant="h2">
                <b>Welcome to Feast</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h3" variant="h5">
                The Worlds #1 Dinner Party Planning Tool
              </Typography>
            </Grid>
            <Grid item>
              {user.id ? (
                <Button
                  component={Link}
                  to="/addparty"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Let's Feast!
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Let's Feast!
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

Landing.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Landing))

// export default connect(mapState, null)(withStyles(styles)(Landing))
