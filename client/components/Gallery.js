import React, {Component} from 'react'
import axios from 'axios'
import {postImage} from '../store'
import {connect} from 'react-redux'

import Card from '@material-ui/core/Card'
import {InputLabel, Button, Input} from '@material-ui/core'
import {List, ListItem, ListItemText} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

class Gallery extends Component {
  constructor() {
    super()
    this.state = {showAddImage: false}
  }
  toggleAddImage = () => {
    this.setState({showAddImage: !this.state.showAddImage})
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

    this.props.postImage(data.url, this.props.partyId, this.props.guest.id)
  }

  render() {
    const {classes} = this.props
    return (
      <Card>
        <List>
          {this.props.images &&
            this.props.images.map(image => (
              <ListItem key={image.id}>
                <img src={image.imageUrl} style={{width: '95vw'}} />
              </ListItem>
            ))}

          {this.state.showAddImage && (
            <Input
              type="file"
              name="imageUrl"
              accept="image/png, image/jpeg"
              onChange={this.handleUploadFile}
              id="imageUrl"
            />
          )}
          <Button
            className={this.props.classes.button}
            onClick={this.toggleAddImage}
          >
            Add Image
          </Button>
        </List>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postImage: (imageUrl, partyId, guestId) =>
    dispatch(postImage(imageUrl, partyId, guestId))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(Gallery))
