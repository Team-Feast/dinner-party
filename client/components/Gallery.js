import React, {Component} from 'react'
import axios from 'axios'
import history from '../history'
import {postImage, getImages, getGuests} from '../store'
import {connect} from 'react-redux'

// MATERIAL UI IMPORTS
import {Input} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
    // flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: 'translateZ(0)',
  },
  subheader: {
    width: '100%'
  },
  input: {
    display: 'none'
  }
})

class Gallery extends Component {
  constructor() {
    super()
    // this.state = {showAddImage: false}
  }

  // componentDidMount() {
  //   const partyId = this.props.match.params
  //   this.props.getImages(partyId)
  // }

  // toggleAddImage = () => {
  //   this.setState({showAddImage: !this.state.showAddImage})
  // }

  findGuestId = () => {
    const {guestPartyToken} = this.props.match.params

    return this.props.guests.find(guest =>{
      return guest.guestPartyToken === guestPartyToken
    })
  }

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
    const guestId  = this.findGuestId()
    console.log(guestId)
    // this.props.postImage(data.url, this.props.partyId, this.props.guest.id)
    // this.props.postImage(data.url, this.props.partyId, 6)
  }

  render() {
    const {classes} = this.props
    console.log('GALLERY', this.props)
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {this.props.images.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img key={tile.id} src={tile.imageUrl} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>

          <Input
            type="file"
            name="imageUrl"
            accept="image/png, image/jpeg"
            onChange={this.handleUploadFile}
            id="imageUrl"
            className={classes.input}
          />
         <label htmlFor="imageUrl">
        <Button
          variant="fab"
          component="span"
          color="primary"
          >
        <AddIcon />
      </Button>
        </label>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postImage: (imageUrl, partyId, guestId) =>
  dispatch(postImage(imageUrl, partyId, guestId)),
  getImages: partyId => dispatch(getImages(partyId)),
  getGuests: partyId => dispatch(getGuests(partyId)),
})

const mapState = state => ({
  images: state.images,
  guests: state.guests,
})

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(Gallery)
)

// <Card>
//   <List>
//     {this.props.images &&
//       this.props.images.map(image => (
//         <ListItem key={image.id}>
//           <img src={image.imageUrl} style={{width: '95vw'}} />
//         </ListItem>
//       ))}

//     {this.state.showAddImage && (
//       <Input
//         type="file"
//         name="imageUrl"
//         accept="image/png, image/jpeg"
//         onChange={this.handleUploadFile}
//         id="imageUrl"
//       />
//     )}
//     <Button
//       className={this.props.classes.button}
//       onClick={this.toggleAddImage}
//     >
//       Add Image
//     </Button>
//   </List>
// </Card>
