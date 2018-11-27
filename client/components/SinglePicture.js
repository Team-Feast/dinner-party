import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getImages} from '../store'

import MobileStepper from '@material-ui/core/MobileStepper'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  }
})

class SinglePicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0
    }
  }

  componentDidMount() {
    const partyId = this.props.match.params.partyId
    console.log('Here', partyId)
    this.props.getImages(partyId)
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }))
  }

  render() {
    const maxSteps = this.props.images.length;

    if (this.props.images.length) {
      console.log('props', this.props)
      const {classes, theme} = this.props
      const {activeStep} = this.state
      return (
        <div className={classes.root}>
          <img
            className={classes.img}
            src={this.props.images[this.props.match.params.pictureId].imageUrl}
          />

          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button
                size="small"
                onClick={this.handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </div>
      )
    } else {
      return null
    }
  }
}

const mapState = state => ({
  images: state.images
})

const mapDispatch = dispatch => ({
  getImages: partyId => dispatch(getImages(partyId))
})

export default connect(mapState, mapDispatch)(withStyles(styles, {withTheme: true})(SinglePicture))
