import React, {Component} from 'react'
import {fetchParties} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// MATERIAL UI IMPORTS
import CssBaseline from '@material-ui/core/CssBaseline'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

class AllParties extends Component {
  state = {
    category: ''
  }

  componentDidMount() {
    this.props.fetchInitialParties(1)
  }

  render() {
    const {classes, parties} = this.props
    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            <List component="nav">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
            </List>
          </div>
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialParties: userId => {
      dispatch(fetchParties(userId))
    }
  }
}

const mapState = state => {
  const {parties} = state
  return {
    parties
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AllParties))
