import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'

const styles = {}

class DemoSuccess extends Component {
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
            // position: 'fixed',
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
                <b>Feast Created!</b>
              </Typography>
              <Grid item>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Go to your feasts!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

DemoSuccess.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(DemoSuccess))
