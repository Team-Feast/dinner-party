import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

const UpcomingEvent = props => {
  const {upcomingEvent, user, classes} = props

  return upcomingEvent.id ? (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <Typography className={classes.heading} color="inherit">
              Next feast:
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.heading} color="inherit">
              {upcomingEvent.title} hosted by{' '}
              {user.id === upcomingEvent.userId
                ? 'you'
                : `${upcomingEvent.user.firstName}
              ${upcomingEvent.user.lastName}`}
            </Typography>
            <Typography className={classes.heading}>
              {`${moment(upcomingEvent.date).format(
                'ddd, MMM DD, YYYY h:mm A'
              )}`}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Card
        className={classes.card}
        component={Link}
        to={`/parties/${upcomingEvent.id}`}
        style={{textDecoration: 'none'}}
      >
        {/* <CardHeader
          title={parties.upcomingEvent.title}
          subheader={moment(parties.upcomingEvent.date).format(
            'LLLL'
          )}
        /> */}
        <CardMedia className={classes.media} image={upcomingEvent.imageUrl} />
        <CardContent>
          <Typography component="p">{upcomingEvent.description}</Typography>
        </CardContent>
      </Card>
    </ExpansionPanel>
  ) : (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="inherit">
          No upcoming feasts... why not create one?
        </Typography>
      </ExpansionPanelSummary>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/images/landing-background.jpg"
        />
      </Card>
    </ExpansionPanel>
  )
}

export default withStyles(styles)(UpcomingEvent)
