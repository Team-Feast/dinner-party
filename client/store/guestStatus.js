import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const SET_GUEST_STATUS = 'SET_GUEST_STATUS'

const setGuestStatus = status => ({
  type: SET_GUEST_STATUS,
  status
})

/**
 * ACTION CREATORS
 */
export const getGuestStatus = token => async dispatch => {
  try {
    const {data} = await axios.get(`/api/parties/rsvp/${token}`)
    dispatch(setGuestStatus(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * THUNK CREATORS
 */
export const putGuestStatus = (token, status) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/parties/rsvp/${token}`, {
      status
    })
    dispatch(setGuestStatus(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export function guestStatusReducer(state = {}, action) {
  switch (action.type) {
    case SET_GUEST_STATUS:
      return action.status
    default:
      return state
  }
}
