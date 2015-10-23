import { combineReducers } from 'redux'

import slides from './slides/reducers'
import modules from './modules/reducers'

export default combineReducers({
  slides,
  modules
})
