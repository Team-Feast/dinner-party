import React, {Component} from 'react'
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

  render() {
    return (
      <List>
        <Button
          className={this.props.classes.button}
          onClick={this.toggleAddItem}
        >
          Add Item
        </Button>
        {this.props.items.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.title} - ${item.guest.email}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemList)