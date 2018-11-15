import React, {Component} from 'react'
import {fetchParties} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// MATERIAL UI IMPORTS
import CssBaseline from '@material-ui/core/CssBaseline'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

class AllParties extends Component {
  state = {
    category: ''
  }

  componentDidMount() {
    this.props.fetchInitialParties(1)
  }

  render() {
    const {classes, parties} = this.props
    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Expansion Panel A
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Expansion Panel B
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialParties: userId => {
      dispatch(fetchParties(userId))
    }
  }
}

const mapState = state => {
  const {parties} = state
  return {
    parties
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AllParties))
