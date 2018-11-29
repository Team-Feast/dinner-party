import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'

const styles = {}

class Landing extends Component {
  state = {}

  render() {
    const {classes, user} = this.props

    return (
      <Fragment>
        <div
          style={{
            background:
              'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(/images/landing-background.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            position: 'fixed',
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
                The World's #1 Dinner Party
                <br />Planning Tool
              </Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to={user.id ? '/addparty' : '/login'}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Let's Feast!
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Landing))
