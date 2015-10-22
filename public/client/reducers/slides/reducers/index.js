import _ from 'lodash'
import u from 'updeep'

import { createReducer } from '../../utils'

import { QUESTION_MODULE_LOAD, VALIDATE_ANSWER } from '../constants'

const initialState = {}

const selectPath = (answers, answer) => {
  if (answers === 'default') return true

  const containsAnswer = answers.reduce((res, possibleAnswer) => {
    return res || _.isEqual(possibleAnswer, answer)
  }, false)
  return containsAnswer
}

export default createReducer(initialState, {
  [QUESTION_MODULE_LOAD]: (state, { moduleRef, slides, graph }) => {
    const updater = {
      [moduleRef]: {
        slides,
        graph,
        remainingLives: 3,
        currentSlideRef: graph.startPoints[0]
      }
    }
    return u(updater, state)
  },

  [VALIDATE_ANSWER]: (state, { moduleRef, answer }) => {
    const { graph, currentSlideRef } = state[moduleRef]

    const foundVertice = graph.vertices[currentSlideRef]
      .reduce((res, vertice) => {
        const { answers } = vertice
        return res || (selectPath(answers, answer) && vertice)
      }, null)

    const { destination, actions = {} } = foundVertice
    const { lives } = actions
    const updater = {
      [moduleRef]: {
        currentSlideRef: destination,
        remainingLives: (l) => l + (lives || 0)
      }
    }
    return u(updater, state)
  }
})
