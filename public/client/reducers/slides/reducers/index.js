import _ from 'lodash'
import u from 'updeep'

import { createReducer } from '../../utils'

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
    const updater = {
      [moduleRef]: { slides, graph, currentSlideRef: graph.startPoints[0] }
    }
    return u(updater, state)
  },
  [VALIDATE_ANSWER]: (state, { moduleRef, answer }) => {
    const { graph, currentSlideRef } = state[moduleRef]

    const destination = graph.vertices[currentSlideRef]
      .reduce((dest, path) => {
        return dest || selectPath(path, answer)
      }, null)

    const updater = {
      [moduleRef]: { currentSlideRef: destination }
    }
    return u(updater, state)
  }
})
