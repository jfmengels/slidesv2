/* eslint-disable no-unused-expressions */
import _ from 'lodash'
import { expect } from 'chai'

import reducer from './'
import { validateAnswer, questionModuleLoad } from '../actions'

import slides from './slides.test.fixture.json'
import graph from './graph.test.fixture.json'

const getCurrentSlideRef = (state, moduleRef) => state.getIn([moduleRef, 'currentSlideRef'])

const applyAnswer = (state, { moduleRef, answer, destination }) => {
  const nextState = reducer(state, validateAnswer(moduleRef, answer))
  const newCurrentSlideRef = getCurrentSlideRef(nextState, moduleRef)
  expect(newCurrentSlideRef).to.equal(destination)
}

const listScenarii = (moduleRef, { answers, destination }) => {
  const givenAnswers = answers === 'default'
    ? ['some random answer which is not a valid answer 12345', 'test']
    : answers

  return givenAnswers.map((answer) => ({
    moduleRef,
    answer,
    destination
  }))
}

describe('slides - validating answer', () => {
  let moduleRef = graph.ref
  const startState = reducer(
    reducer(undefined, questionModuleLoad(moduleRef, slides, graph)),
    { type: '@@INIT' }
  )

  beforeEach(() => {
    moduleRef = graph.ref
  })

  it('should set currentSlideRef to be the next slide following the graph\'s vertices', () => {
    const currentSlideRef = getCurrentSlideRef(startState, moduleRef)
    expect(currentSlideRef).to.exist
    const potentialPaths = graph.vertices[currentSlideRef]
    expect(potentialPaths).to.exist

    // List all available answers and the corresponding destination in graph
    _(potentialPaths)
      .map((path) => listScenarii(moduleRef, path))
      .flatten()
      .each((scenario) => applyAnswer(startState, scenario)) // try it out and make assertion
      .value()
  })

  it('should only take the default path if no other path matches')
  it('should do ? when no route is found')
})
