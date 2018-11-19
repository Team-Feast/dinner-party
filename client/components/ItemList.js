import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  withStyles
} from '@material-ui/core'
import PropTypes from 'prop-types'
import CommentIcon from '@material-ui/icons/Comment'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'

import {AddItem} from '../components'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import {postItem} from '../store'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})
class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {showAddItem: false}
  }

  toggleAddItem = () => {
    this.setState({showAddItem: !this.state.showAddItem})
  }

  toggleAddGuestToItem = item => {
    if (this.props.guest) {
      this.props.postItem({...item, guestId: this.props.guest.id})
    } else {
      console.log('ERROR: YOU CANNOT DO THIS')
    }
  }

  toggleRemoveGuestFromItem = item => {
    if (this.props.guest) {
      this.props.postItem({...item, guestId: null})
    } else {
      console.log('ERROR: YOU CANNOT DO THIS')
    }
  }

  render() {
    const {guest, items} = this.props
    return (
      <ExpansionPanelDetails>
        <List>
          {items.map(item => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.title}  ${
                  item.guest !== null ? ' - ' + item.guest.email : ''
                }`}
              />
              <ListItemSecondaryAction>
                {/* <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton> */}
                {item.guest && guest ? (
                  item.guest.id === guest.id ? (
                    <IconButton
                      aria-label="Remove"
                      value={item.id}
                      onClick={this.toggleRemoveGuestFromItem.bind(this, item)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <span />
                  )
                ) : (
                  <IconButton
                    aria-label="Add"
                    value={item.id}
                    onClick={this.toggleAddGuestToItem.bind(this, item)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <Button
            className={this.props.classes.button}
            onClick={this.toggleAddItem}
          >
            Add Item
          </Button>
          {this.state.showAddItem && <AddItem />}
        </List>
      </ExpansionPanelDetails>
    )
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  postItem: item => dispatch(postItem(item))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ItemList))
