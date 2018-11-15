import axios from 'axios'
import history from '../history'


//ACTION TYPES
const SET_PARTY = 'SET_PARTY'


//ACTION CREATORS
const setParty = party =>({
  type: SET_PARTY,
  party
})

//THUNK CREATORS

export const fetchParty = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/parties/${id}`)
    dispatch(setParty(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = {}, action){
  switch(action.type){
    case SET_PARTY:
      return action.party

    default:
     return state
  }
}
