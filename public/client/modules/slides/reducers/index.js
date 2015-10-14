import _ from 'lodash'
import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'

import { QUESTION_MODULE_LOAD, VALIDATE_ANSWER } from '../constants'

const initialState = {}

const selectPath = ({ destination, answers }, answer) => {
  if (answers === 'default') {
    return destination
  }
  const containsAnswer = answers.reduce((res, possibleAnswer) => {
    return res || _.isEqual(possibleAnswer, answer)
  }, false)
  return (containsAnswer && destination) || null
}

export default createReducer(initialState, {
  [QUESTION_MODULE_LOAD]: (state, { moduleRef, slides, graph }) => {
    return state
      .setIn([moduleRef], Immutable.fromJS({ slides, graph }))
      .setIn([moduleRef, 'currentSlideRef'], graph.startPoints[0])
  },
  [VALIDATE_ANSWER]: (state, { moduleRef, answer }) => {
    const currentModule = state.getIn([moduleRef])
    const graph = currentModule.get('graph')
    const currentSlideRef = currentModule.get('currentSlideRef')

    const destination = graph
      .getIn(['vertices', currentSlideRef])
      .reduce((dest, path) => {
        return dest || selectPath(path.toJS(), answer)
      }, null)

    return state
      .setIn([moduleRef, 'currentSlideRef'], destination)
  }
})
