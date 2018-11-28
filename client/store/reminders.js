import axios from 'axios'
//import history from '../history'

//ACTION TYPES
const SET_REMINDERS = 'SET_REMINDERS'
const ADD_REMINDER = 'ADD_REMINDER'
const EDIT_REMINDER = 'EDIT_REMINDER'
const REMOVE_REMINDER = 'REMOVE_REMINDER'

//ACTION CREATORS
const setItems = reminders => ({
  type: SET_REMINDERS,
  reminders
})

const addReminder = reminder => ({
  type: ADD_REMINDER,
  reminder
})

const editReminder = reminder => ({
  type: EDIT_REMINDER,
  reminder
})

const removeReminder = reminderId => ({
  type: REMOVE_REMINDER,
  reminderId
})

//THUNK CREATORS
export const getReminders = reminderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/reminders/party/${reminderId}`)
      dispatch(setItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postItem = item => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reminders', item)
      dispatch(addReminder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const putItem = reminder => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/reminders/${reminder.id}`, item)
      dispatch(editReminder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteItem = reminderId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/reminders/${reminderId}`)
      dispatch(removeReminder(reminderId))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case SET_REMINDERS:
      return action.reminders
    case ADD_REMINDER:
      return [...state, action.reminder]
    case EDIT_REMINDER:
      return state.map(
        reminder =>
          reminder.id !== action.reminder.id ? reminder : action.reminder
      )
    case REMOVE_REMINDER:
      return state.filter(reminder => reminder.id !== action.reminderId)
    default:
      return state
  }
}
