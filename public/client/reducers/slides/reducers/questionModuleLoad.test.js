import { expect } from 'chai'
import u from 'updeep'

import reducer from './'
import { questionModuleLoad } from '../actions'

import slides from './slides.test.fixture.json'
import graph from './graph.test.fixture.json'

describe('slides - module loading', () => {
  let state
  let moduleRef = graph.ref
  const startState = reducer(
    reducer(startState, questionModuleLoad(moduleRef, slides, graph)),
    { type: '@@INIT' }
  )

  beforeEach(() => {
    moduleRef = graph.ref
    state = startState
  })

  it('should add a new module when modules field is empty', () => {
    expect(state[moduleRef].slides).to.deep.equal(slides)
    expect(state[moduleRef].graph).to.deep.equal(graph)
    expect(state[moduleRef].currentSlideRef).to.equal(graph.startPoints[0])
  })

  it('should add a new module when module is not yet present, but modules is not empty', () => {
    const newRef = `${moduleRef}A`
    const newSlides = [{
      a: 5,
      b: 6
    }, {
      a: 7,
      b: 8
    }]
    const newGraph = JSON.parse(JSON.stringify(graph))
    newGraph.ref = newRef
    state = u({ [moduleRef]: { currentSlideRef: '9.A.2' } }, state)

    const nextState = reducer(state, questionModuleLoad(newRef, newSlides, newGraph))
    // Should not affect other modules
    expect(nextState[moduleRef].slides).to.deep.equal(slides)
    expect(nextState[moduleRef].graph).to.deep.equal(graph)
    expect(nextState[moduleRef].currentSlideRef).to.equal('9.A.2')

    expect(nextState[newRef].slides).to.deep.equal(newSlides)
    expect(nextState[newRef].graph).to.deep.equal(newGraph)
    expect(nextState[newRef].currentSlideRef).to.equal(graph.startPoints[0])
  })

  it('should override a module when it is already present, and reset the currentSlideRef', () => {
    const newSlides = [{
      a: 5,
      b: 6
    }, {
      a: 7,
      b: 8
    }]
    state = u({ 0: { currentSlideRef: 5 } }, state)

    const nextState = reducer(state, questionModuleLoad(moduleRef, newSlides, graph))
    // const { slides, graph, currentSlideRef } = nextState
    expect(nextState[moduleRef].slides).to.not.deep.equal(slides)
    expect(nextState[moduleRef].slides).to.deep.equal(newSlides)
    expect(nextState[moduleRef].graph).to.deep.equal(graph)
    expect(nextState[moduleRef].currentSlideRef).to.equal(graph.startPoints[0])
  })
})
