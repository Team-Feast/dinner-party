import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SET_PARTY = 'SET_PARTY'
const NEW_ITEM = 'NEW_ITEM'

//ACTION CREATORS
const setParty = party => ({
  type: SET_PARTY,
  party
})

const newItem = item => ({
  type: NEW_ITEM,
  item
})

//THUNK CREATORS

export const postItem = item => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/items', item)
      dispatch(newItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const fetchParty = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/parties/${id}`)
    dispatch(setParty(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case SET_PARTY:
      return action.party
    case NEW_ITEM:
      return {...state, items: [...state.items, action.item]}
    default:
      return state
  }
}
