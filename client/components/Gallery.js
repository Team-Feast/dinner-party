import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import axios from 'axios'
import history from '../history'
import {postImage, getImages, getGuests} from '../store'
import {connect} from 'react-redux'

// MATERIAL UI IMPORTS
import {Input} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper
    minWidth: 300,
    width: '100%'
  },
  gridList: {
    // width: 500,
    // height: 450
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  focusVisible: {},
  subheader: {
    width: '100%'
  },
  uploadBtnWrapper: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  uploadBtnWrapperInput: {
    position: 'absolute',
    left: '0',
    top: '0',
    opacity: '0'
  },
  input: {
    display: 'none'
    // position: 'absolute',
    // left: '0',
    // top: '0',
    // opacity: '0'
  },
  fab: {
    position: 'absolute',
    left: 0

  },
  button: {
    margin: theme.spacing.unit
  }
})

class Gallery extends Component {
  componentDidMount() {
    // const partyId = this.props.match.params.id
    const partyId = this.props.partyId
    this.props.getImages(partyId)
  }

  toggleAddImage = () => {
    this.setState({showAddImage: !this.state.showAddImage})
  }

  // findGuestId = () => {
  //   const {guestPartyToken} = this.props.match.params
  //   let result = this.props.guests.find(guest => {
  //     return guest.guestPartyToken === guestPartyToken
  //   })

  //   return result || 1
  // }

  handleUploadFile = async event => {
    const url = 'https://api.cloudinary.com/v1_1/dhgftlgcc/image/upload'
    const formData = new FormData()

    formData.append('file', event.target.files[0])
    formData.append('upload_preset', 'xlji39fe')
    formData.append('api_key', process.env.CLOUDINARY_API_KEY)
    const {data} = await axios.post(url, formData, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    // const guestId = this.findGuestId()
    this.props.postImage(data.url, this.props.partyId, 1)
  }

  singlePicture = () => {}

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.0}>
          {this.props.images.map(tile => (
            <GridListTile key={tile.id}>
              <img
                // onClick={this.SinglePicture}
                onClick={() =>
                  history.push(
                    `/parties/${this.props.partyId}/singlePicture/${tile.id}`
                  )
                }
                key={tile.id}
                src={tile.imageUrl}
              />
            </GridListTile>
          ))}
          </GridList>

          {/* <div className={classes.uploadBtnWrapper}> */}
         {/* <Fab disabled aria-label="Camera" className={classes.fab}> */}
        <label htmlFor="imageUrl">
          <PhotoCamera />
          </label>
        {/* </Fab> */}
          <Input
            accept="image/png, image/jpeg"
            type="file"
            name="imageUrl"
            onChange={this.handleUploadFile}
            id="imageUrl"
            className={classes.uploadBtnWrapperInput}
          />
        {/* </div> */}

      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  postImage: (imageUrl, partyId, guestId) =>
    dispatch(postImage(imageUrl, partyId, guestId)),
  getImages: partyId => dispatch(getImages(partyId)),
  getGuests: partyId => dispatch(getGuests(partyId))
})

const mapState = state => ({
  images: state.images,
  guests: state.guests
})

export default connect(mapState, mapDispatch)(withStyles(styles)(Gallery))
