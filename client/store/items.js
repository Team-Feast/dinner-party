import axios from 'axios'
//import history from '../history'

//ACTION TYPES
const SET_ITEMS = 'SET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

//ACTION CREATORS
const setItems = items => ({
  type: SET_ITEMS,
  items
})

const addItem = item => ({
  type: ADD_ITEM,
  item
})

const editItem = item => ({
  type: EDIT_ITEM,
  item
})

const removeItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})

//THUNK CREATORS
export const getItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/items')
      dispatch(setItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postItem = item => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/items', item)
      dispatch(addItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const putItem = item => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/items/${item.id}`, item)
      dispatch(editItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteItem = itemId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/items/${itemId}`)
      dispatch(removeItem(itemId))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADD_ITEM:
      return [...state, action.item]
    case EDIT_ITEM:
      return state.map(
        item => (item.id !== action.item.id ? item : action.item)
      )
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.itemId)
    default:
      return state
  }
}
