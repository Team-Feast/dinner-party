import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchParty} from '../store'

class Party extends Component {
  componentDidMount() {
    this.props.fetchParty(this.props.match.params.id)
  }
  render() {
    const {title, description, location, image, status, user} = this.props.party
    console.log("HERe", this.props)
    if (!this.props.party) {
      return null
    } else {
      return (
        <div>
          <img src={image}/>
          <h1>{title}</h1>
          <h1>{description}</h1>
          <h1>{location}</h1>



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

export default connect(mapState, mapDispatch)(Party)
