import React, {Component} from 'react'
import axios from 'axios'
import {postImage} from '../store'
import {connect} from 'react-redux'

import {InputLabel, Button, Input} from '@material-ui/core'
import {List, ListItem, ListItemText} from '@material-ui/core'

class Gallery extends Component {
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
    return (
      <List>
        {this.props.images.map(image => (
          <ListItem key={image.id}>
            <img src={image.url} />
          </ListItem>
        ))}

        <InputLabel htmlFor="imageUrl">Image URL</InputLabel>
        <Input
          type="file"
          name="imageUrl"
          accept="image/png, image/jpeg"
          onChange={this.handleUploadFile}
          id="imageUrl"
        />
        {/* <Button
        className={this.props.classes.button}
        onClick={this.toggleAddItem}
      >
        Add Item
      </Button> */}
      </List>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postImage: (imageUrl, partyId, guestId) =>
    dispatch(postImage(imageUrl, partyId, guestId))
})

export default connect(null, mapDispatchToProps)(Gallery)
