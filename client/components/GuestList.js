import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

const GuestList = props => {
  return (
    <List>
      {props.guests.map(guest => (
        <ListItem key={guest.id}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              {guest.id % 2 === 0 ? (
                <Avatar src="/images/menAvatar.png" />
              ) : (
                <Avatar src="/images/womanAvatar.png" />
              )}
            </Grid>
            <Grid item xs={6}>
              <ListItemText primary={`${guest.email}`} />
            </Grid>
            <Grid item >
              <ListItemText primary={`${guest.status}`} />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}

export default GuestList
