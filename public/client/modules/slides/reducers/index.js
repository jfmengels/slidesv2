import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { QUESTION_MODULE_LOAD } from '../constants'

const initialState = {
  modules: {}
}

export default createReducer(initialState, {
  [QUESTION_MODULE_LOAD]: (state, { ref, slides }) => {
    return state
      .setIn(['modules', ref], Immutable.fromJS({ slides }))
      .setIn(['modules', ref, 'currentPosition'], 0)
  }
})
