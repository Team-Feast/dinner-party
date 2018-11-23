import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
})

const HostingEvents = props => {
  const {hosting, classes} = props

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          Feasts you're hosting
        </Typography>
      </ExpansionPanelSummary>
      {hosting &&
        hosting.length && (
          <List dense>
            {hosting.map(party => (
              <ListItem
                key={party.id}
                button
                component={Link}
                to={`/parties/${party.id}`}
              >
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <Avatar src={`${party.imageUrl}`} />
                  </Grid>
                  <Grid item xs={4}>
                    <ListItemText primary={`${party.title}`} />
                  </Grid>
                  <Grid item>
                    <ListItemText
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

export default withStyles(styles)(HostingEvents)
