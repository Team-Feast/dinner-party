import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'

const GuestList = props => {
  return (
    <List>
      {props.guests.map(guest => (
        <ListItem key={guest.id}>
        {
          guest.id % 2 === 0 ? (
          <Avatar src="/images/menAvatar.png"/>)
          : <Avatar src="/images/womanAvatar.png"/>

        }
        <ListItemText primary={`${guest.email} - ${guest.status}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default GuestList
