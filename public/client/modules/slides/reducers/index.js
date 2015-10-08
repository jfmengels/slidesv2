import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { QUESTION_MODULE_LOAD } from '../constants'

const initialState = {
  modules: {}
}

export default createReducer(initialState, {
  [QUESTION_MODULE_LOAD]: (state, { moduleRef, slides, graph }) => {
    return state
      .setIn(['modules', moduleRef], Immutable.fromJS({ slides, graph }))
      .setIn(['modules', moduleRef, 'currentSlideRef'], graph.startPoints[0])
  }
})
