import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  listItemTitle: {
    fontSize: theme.typography.pxToRem(12)
  },
  listItem: {
    fontSize: theme.typography.pxToRem(11)
  }
})

const avatarColors = {}
const PastParties = props => {
  const {pastEvents, classes} = props

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>Past feasts</Typography>
      </ExpansionPanelSummary>
      <Divider />
      {pastEvents &&
        pastEvents.length && (
          <List dense>
            {pastEvents.map(party => (
              <ListItem
                key={party.id}
                button
                component={Link}
                to={`/parties/${party.id}/rsvp/${
                  party.guests[0].guestPartyToken
                }`}
              >
                <Grid
                  container
                  alignItems="center"
                  style={{flexWrap: 'nowrap'}}
                >
                  <Grid item xs={2}>
                    <Avatar src={`${party.imageUrl}`} />
                  </Grid>
                  <Grid item xs={5}>
                    <ListItemText
                      className={classes.listItemTitle}
                      primary={`${party.title}`}
                      secondary={`${party.user.firstName} ${
                        party.user.lastName
                      }`}
                    />
                  </Grid>
                  <Grid item>
                    <ListItemText
                      className={classes.listItem}
                      secondary={`${moment(party.date).format(
                        'ddd, MMM DD, YYYY h:mm A'
                      )}`}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
    </ExpansionPanel>
  )
}

export default withStyles(styles)(PastParties)
