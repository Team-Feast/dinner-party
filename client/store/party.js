import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SET_PARTY = 'SET_PARTY'
const ADD_PARTY = 'ADD_PARTY'
const EDIT_PARTY = 'EDIT_PARTY'
const REMOVE_PARTY = 'REMOVE_PARTY'

//ACTION CREATORS
const setParty = party => ({
  type: SET_PARTY,
  party
})

const addParty = party => ({
  type: ADD_PARTY,
  party
})

const editParty = party => ({
  type: EDIT_PARTY,
  party
})

const removeParty = partyId => ({
  type: REMOVE_PARTY,
  partyId
})

//THUNK CREATORS
export const getParty = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/parties/${id}`)
    dispatch(setParty(data))
  } catch (err) {
    console.error(err)
  }
}

export const postParty = ({info, guestEmails}) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/parties', {
        info: info,
        guestEmails: guestEmails
      })
      dispatch(addParty(data))
      history.push(`/parties/${data.id}`)
    } catch (error) {
      console.error(error)
    }
  }
}

export const putParty = party => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/parties/${party.id}`, party)
      dispatch(editParty(data))
      history.push(`/parties/${data.id}`)
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteParty = partyId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/parties/${partyId}`)
      dispatch(removeParty(partyId))
      history.push(`/`)
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case SET_PARTY:
      return action.party
    case ADD_PARTY:
      return action.party
    case EDIT_PARTY:
      return action.party
    case REMOVE_PARTY:
      return {}
    default:
      return state
  }
}
