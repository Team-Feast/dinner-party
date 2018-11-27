import React, {Component} from 'react'

export class FormPartyInfo extends Component {
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    const {values} = this.props

    return <div>Hello From PARTY INFO</div>
  }
}
