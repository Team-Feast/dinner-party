import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SET_PARTY = 'SET_PARTY'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const SET_PARTIES = 'SET_PARTIES'

const SET_GUEST_STATUS = 'SET_GUEST_STATUS'

//ACTION CREATORS
const setParty = party => ({
  type: SET_PARTY,
  party
})
const addItem = item => ({
  type: ADD_ITEM,
  item
})

const deleteItem = itemId => ({
  type: DELETE_ITEM,
  itemId
})

const setParties = parties => ({
  type: SET_PARTIES,
  parties
})

const setGuestStatus = status => ({
  type: SET_GUEST_STATUS,
  status
})

//THUNK CREATORS
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

export const sendRemoveItem = itemId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/items/${itemId}`)
      dispatch(deleteItem(itemId))
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
export const fetchParties = userId => async dispatch => {
  try {
    const data = [
      {
        id: 50,
        title: 'Wasa bujuhvok muwud tolev hucvigir.',
        description:
          'Akmeze dab guhusjet job kilcoom kagcuw veb webeb zofiwe omfir zel dor ku pokfi ebu nufik fazwi. Lolhuv pahfuulu cubekla mozhubza nuj lapatiapi hetel wojoku mu fozemesa un me lamvoto vicifse dittek je. To hewuv gedsud wa arimuci ko juc ugeme fewaraf og lep waksukom. Mufij dopedaju alela ije mogi vibcevub uhopudzoh sodurweg law ro wibo zawce pefru. Fes meb romtuvu nomoho vebi biwidjaf mi neros kimtannog gud gap fo zuzsoce jubedunih gojlapbuf padihita.',
        location: '1306 Tisnet Rd, Vootfo, SC, LA, 93215',
        date: '2018-11-15T20:22:01.049Z',
        status: 'cancelled',
        imageUrl: '/images/default-party.jpg',
        createdAt: '2018-11-15T20:22:01.106Z',
        updatedAt: '2018-11-15T20:22:01.106Z',
        userId: 1
      }
    ]
    dispatch(setParties(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchGuestStatus = (
  guestPartyToken,
  partyId
) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/parties/${partyId}/rsvp/${guestPartyToken}`
    )
    dispatch(setGuestStatus(data))
  } catch (err) {
    console.error(err)
  }
}
export const putGuestStatus = (guestPartyToken, status) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/guests/rsvp/${guestPartyToken}`,
      status
    )
    dispatch(setGuestStatus(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case SET_PARTY:
      return action.party
    case ADD_ITEM:
      return {...state, items: [...state.items, action.item]}
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId)
      }
    default:
      return state
  }
}

export function partiesReducer(state = [], action) {
  switch (action.type) {
    case SET_PARTIES:
      return action.parties
    default:
      return state
  }
}

export function guestStatusReducer(state = {}, action) {
  switch (action.type) {
    case SET_GUEST_STATUS:
      return action.status
    default:
      return state
  }
}
