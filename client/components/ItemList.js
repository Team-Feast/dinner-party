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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Card from '@material-ui/core/Card'
import {AddItem} from '.'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Grid from '@material-ui/core/Grid'
import MaximizeIcon from '@material-ui/icons/Maximize'
import Typography from '@material-ui/core/Typography'

import {putItem} from '../store'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  padding: {
    paddingTop: '8px',
    paddingBottom: '8px'
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
      this.props.putItem({...item, guestId: this.props.guest.id})
    } else {
      //TODO error control
      console.log('ERROR: YOU CANNOT DO THIS')
    }
  }

  toggleRemoveGuestFromItem = item => {
    if (this.props.guest) {
      this.props.putItem({...item, guestId: null})
    } else {
      //TODO error control
      console.log('ERROR: YOU CANNOT DO THIS')
    }
  }

  render() {
    const {guest, items, classes} = this.props
    return (
      <Card>
        <List>
          {items.map(item => (
            <ListItem key={item.id} className={classes.padding}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <ListItemText primary={`${item.title}`} />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="h6">{'  -  '}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <ListItemText
                    primary={`${
                      item.guest !== null ? item.guest.firstName : ''
                    }`}
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemSecondaryAction>
                    {item.guest && guest ? (
                      item.guest.id === guest.id ? (
                        <IconButton
                          aria-label="Remove"
                          onClick={this.toggleRemoveGuestFromItem.bind(
                            this,
                            item
                          )}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <span />
                      )
                    ) : (
                      <IconButton
                        aria-label="Add"
                        onClick={this.toggleAddGuestToItem.bind(this, item)}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <AddItem />
          {/* {this.state.showAddItem && <AddItem />} */}

          {/* <Button */}
          {/* className={this.props.classes.button}
            // onClick={this.toggleAddItem}
            >
            Add Item
          </Button> */}
        </List>
      </Card>
    )
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  putItem: item => dispatch(putItem(item))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ItemList))
