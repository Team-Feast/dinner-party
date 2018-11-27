import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user, {passwordReducer} from './user'
import items from './items'
import guests from './guests'
import parties from './parties'
import party from './party'
import images from './images'

const reducer = combineReducers({
  user,
  items,
  guests,
  party,
  parties,
  images,
  password: passwordReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './party'
export * from './guests'
export * from './items'
export * from './parties'
export * from './images'
