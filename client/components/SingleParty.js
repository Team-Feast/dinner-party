import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchParty} from '../store'
import {GuestList, ItemList} from '../components'
import moment from 'moment'

import PropTypes from 'prop-types'
import {withStyles, Button} from '@material-ui/core'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class SingleParty extends Component {
  constructor(props) {
    super(props)
    this.state = {showGuestList: false, showItemList: false}
  }

  componentDidMount() {
    this.props.fetchParty(this.props.match.params.id)
  }

  toggleGuestList = () => {
    this.setState({showGuestList: !this.state.showGuestList})
  }

  toggleItemList = () => {
    this.setState({showItemList: !this.state.showItemList})
  }

  render() {
    const {
      title,
      description,
      location,
      imageUrl,
      status,
      user,
      date,
      guests,
      items
    } = this.props.party

    const {classes} = this.props

    if (!this.props.party.id) {
      return null
    } else {
      return (
        <div>
          <img width="360" src={imageUrl} />
          <h3>{title}</h3>
          <h4>{moment(date).format('MMMM Do YYYY, h:mm')}</h4>
          <h4>{location}</h4>
          <p>{description}</p>
          <Button className={classes.button} onClick={this.toggleGuestList}>
            Guest List
          </Button>
          <Button className={classes.button} onClick={this.toggleItemList}>
            Item List
          </Button>
          {this.state.showGuestList && <GuestList guests={guests} />}
          {this.state.showItemList && <ItemList items={items} />}
          <image />
        </div>
      )
    }
  }
}

const mapState = state => ({
  party: state.party
})

const mapDispatch = dispatch => ({
  fetchParty: id => dispatch(fetchParty(id))
})

SingleParty.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(SingleParty))
