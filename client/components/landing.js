import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import {withStyles} from '@material-ui/core/styles'

const styles = {
  backgroundImage: '/images/landing-background.jpg',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  height: '200px'
}

class Landing extends Component {
  state = {}

  handleClick = event => {}

  render() {
    const {classes} = this.props

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
            justifyContent: 'center'
          }}
        >
          <h1>Title</h1>
          <h3>Info</h3>
          <Link to="/add-party">Let's Feast!</Link>
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

export default withStyles(styles)(Landing)

// export default connect(mapState, null)(withStyles(styles)(Landing))
