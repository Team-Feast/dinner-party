import React, {Component} from 'react'

const GuestList = props => {
  console.log("Here111", props)
  return (
    <ul>
      {props.guests.map(guest => (
        <li key={guest.id}>
          {guest.email}
          Status: {guest.status}
        </li>
      ))}
    </ul>
  )
}

export default GuestList
