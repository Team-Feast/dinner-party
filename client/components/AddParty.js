import React, {Component} from 'react'
import {connect} from 'react-redux'

class AddParty extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      time: '',
      location: '',
      description: '',
      status: '',

    }
  }
  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default AddParty;
