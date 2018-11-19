import axios from 'axios'
//import history from '../history'

//ACTION TYPES
const SET_PARTIES = 'SET_PARTIES'

//ACTION CREATORS
const setParties = parties => ({
  type: SET_PARTIES,
  parties
})

//THUNK CREATORS
export const getParties = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/parties/user/${userId}/`)
    dispatch(setParties(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(
  state = {
    upcoming: {},
    hosting: [],
    attending: [],
    history: []
  },
  action
) {
  switch (action.type) {
    case SET_PARTIES:
      return action.parties
    default:
      return state
  }
}
