import { combineReducers } from 'redux'
import timer from './TimerReducer'
import nav from './NavReducer'

export default combineReducers({
  timer,
  nav
})
