import axios from 'axios'

const SET_IMAGES = 'SET_IMAGES'
const ADD_IMAGE = 'ADD_IMAGE'

const setImages = images => ({
  type: SET_IMAGES,
  images
})

const addImage = image => ({
  type: ADD_IMAGE,
  image
})

export const postImage = (imageUrl, partyId, guestId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/images/`, {
        imageUrl,
        partyId,
        guestId
      })
      dispatch(addImage(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getImages = partyId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/images/${partyId}`)
      dispatch(setImages(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_IMAGES:
      return action.images
    case ADD_IMAGE:
      return [...state, action.image]
    default:
      return state
  }
}
