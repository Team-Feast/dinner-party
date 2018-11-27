import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import {Icon, ThumbDown, ThumbUp} from '@material-ui/icons'

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
            <Grid item xs={9}>
              <ListItemText primary={`${guest.firstName}`} />
            </Grid>

            <Grid item>
              {guest.status === 'attending' && <ThumbUp />}
              {/* <ListItemText primary={`${guest.status}`} /> */}
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}

export default GuestList
