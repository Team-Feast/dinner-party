import axios from 'axios'
//import history from '../history'

//ACTION TYPES
const SET_GUESTS = 'SET_GUESTS'
const ADD_GUEST = 'ADD_GUEST'
const EDIT_GUEST = 'EDIT_GUEST'
const REMOVE_GUEST = 'REMOVE_GUEST'
const ADD_TO_CALENDAR = 'ADD_TO_CALENDAR'

//ACTION CREATORS
const setGuests = guests => ({
  type: SET_GUESTS,
  guests
})

const addGuest = guest => ({
  type: ADD_GUEST,
  guest
})

const editGuest = guest => ({
  type: EDIT_GUEST,
  guest
})

const removeGuest = guestId => ({
  type: REMOVE_GUEST,
  guestId
})

const addToCalendar = guest => ({
  type: ADD_TO_CALENDAR,
  guest
})

//THUNK CREATORS
export const getGuests = partyId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/parties/${partyId}/guests`)
      dispatch(setGuests(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postGuest = guest => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/guests', guest)
      dispatch(addGuest(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const putGuest = guest => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/guests/${guest.id}`, guest)
      dispatch(editGuest(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteGuest = guestId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/guests/${guestId}`)
      dispatch(removeGuest(guestId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postToCalendar = (guestId, party) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/users/${guestId}/calendars`, party)
      dispatch(addToCalendar(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case SET_GUESTS:
      return action.guests
    case ADD_GUEST:
      return [...state, action.guest]
    case EDIT_GUEST:
      return state.map(
        guest => (guest.id !== action.guest.id ? guest : action.guest)
      )
    case REMOVE_GUEST:
      return state.filter(guest => guest.id !== action.guestId)
    case ADD_TO_CALENDAR:
      return state.map(
        guest => (guest.id !== action.guest.id ? guest : action.guest)
      )
    default:
      return state
  }
}
