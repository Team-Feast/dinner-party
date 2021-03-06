import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import green from '@material-ui/core/colors/green'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'

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

const avatarBackgroundColor = [
  '#266de0',
  '#8625e0',
  '#24e06c',
  '#e08e24',
  '#e0244f'
]

const GuestList = props => {
  const {classes} = props
  return (
    <List>
      {props.guests.map(guest => (
        <ListItem key={guest.id} className={classes.padding}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              {guest.user && guest.user.id ? (
                <Avatar src={guest.user.imageUrl} />
              ) : (
                <Avatar
                  style={{
                    backgroundColor: avatarBackgroundColor[guest.id % 5]
                  }}
                >
                  {guest.firstName[0]}
                </Avatar>
              )}
            </Grid>
            <Grid item xs={9}>
              <Typography style={{fontSize: '14px'}}>{`${guest.firstName} - ${
                guest.email
              }`}</Typography>
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
