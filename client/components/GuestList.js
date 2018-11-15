import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'

const GuestList = props => {
  return (
    <List>
      {props.guests.map(guest => (
        <ListItem key={guest.id}>
          <ListItemText primary={`${guest.email} - ${guest.status}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default GuestList
