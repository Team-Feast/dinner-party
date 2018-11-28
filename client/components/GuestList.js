import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import green from '@material-ui/core/colors/green'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  green: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {},
  padding: {
    paddingTop: '8px',
    paddingBottom: '8px'
  }
})

const GuestList = props => {
  const {classes} = props
  return (
    <List>
      {props.guests.map(guest => (
        <ListItem key={guest.id} className={classes.padding}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Avatar
                style={{
                  backgroundColor: `#${Math.random()
                    .toString(16)
                    .slice(2, 8)
                    .toUpperCase()
                    .slice(-6)}`
                }}
              >
                {guest.firstName[0]}
              </Avatar>
            </Grid>
            <Grid item xs={9}>
              <ListItemText primary={`${guest.firstName}`} />
            </Grid>

            <Grid item>{guest.status === 'attending' && <ThumbUpIcon />}</Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}

GuestList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GuestList)

//

// (
//   <Checkbox
//     checked
//     classes={{
//       root: classes.green,
//       checked: classes.checked
//     }}
//   />
// )
