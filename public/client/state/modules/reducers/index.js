import { createReducer } from '../../utils'
import { LOAD_MODULE_LIST } from '../constants'

const initialState = []

export default createReducer(initialState, {
  [LOAD_MODULE_LIST]: (state, { moduleList }) => moduleList
})
