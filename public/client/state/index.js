import _ from 'lodash'
import { combineReducers } from 'redux'

import { mergeActions } from './utils'
import * as slides from './slides'
import * as modules from './modules'

const stateHandlers = {
  slides,
  modules
}

export const reducers = combineReducers(_.mapValues(stateHandlers, 'reducers'))

export const actions = Object.freeze(mergeActions(stateHandlers))
