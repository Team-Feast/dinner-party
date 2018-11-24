import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const resetEmailSent = status => ({type: RESET_EMAIL_SENT, status})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (info, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, info)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const postForgotPassword = email => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/forgotpassword', email)
    dispatch(resetEmailSent({status: res}))
  } catch (error) {
    dispatch(resetEmailSent({status: error.response}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

export function passwordReducer(state = {}, action) {
  switch (action.type) {
    case RESET_EMAIL_SENT:
      return action.status
    default:
      return state
  }
}
