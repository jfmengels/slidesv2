import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { LOAD_MODULE_LIST } from '../constants'

const initialState = Immutable.List()

export default createReducer(initialState, {
  [LOAD_MODULE_LIST]: (state, { moduleList }) => Immutable.List(moduleList)
})
