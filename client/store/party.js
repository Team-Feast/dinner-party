import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SET_PARTY = 'SET_PARTY'
const NEW_ITEM = 'NEW_ITEM'
const SET_PARTIES = 'SET_PARTIES'

//ACTION CREATORS
const setParty = party => ({
  type: SET_PARTY,
  party
})

const newItem = item => ({
  type: NEW_ITEM,
  item})
const setParties = parties => ({
  type: SET_PARTIES,
  parties
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

export function partiesReducer(state = [], action) {
  switch (action.type) {
    case SET_PARTIES:
      return action.parties
    default:
      return state
  }
}
