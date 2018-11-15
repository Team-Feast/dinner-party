import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchParty} from '../store'
import GuestList from './GuestList'

class SingleParty extends Component {
  componentDidMount() {
    this.props.fetchParty(this.props.match.params.id)
  }
  render() {
    const {
      title,
      description,
      location,
      image,
      status,
      user,
      guests
    } = this.props.party
    console.log('HERe', this.props)
    if (!this.props.party.id) {
      return null
    } else {
      return (
        <div>
          <img src={image} />
          <h1>{title}</h1>
          <h1>{description}</h1>
          <h1>{location}</h1>
          <GuestList guests={guests} />

          <image />
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchParty: id => dispatch(fetchParty(id))
})

const mapState = state => ({
  party: state.party
})

export default connect(mapState, mapDispatch)(SingleParty)
