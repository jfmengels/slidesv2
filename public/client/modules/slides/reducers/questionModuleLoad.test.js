import { expect } from 'chai'

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
    expect(state.getIn([moduleRef, 'slides']).toJS()).to.deep.equal(slides)
    expect(state.getIn([moduleRef, 'graph']).toJS()).to.deep.equal(graph)
    expect(state.getIn([moduleRef, 'currentSlideRef'])).to.equal(graph.startPoints[0])
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
    state = state.setIn([moduleRef, 'currentSlideRef'], '9.A.2')

    const nextState = reducer(state, questionModuleLoad(newRef, newSlides, newGraph))
    // Should not affect other modules
    expect(nextState.getIn([moduleRef, 'slides']).toJS()).to.deep.equal(slides)
    expect(nextState.getIn([moduleRef, 'graph']).toJS()).to.deep.equal(graph)
    expect(nextState.getIn([moduleRef, 'currentSlideRef'])).to.equal('9.A.2')

    expect(nextState.getIn([newRef, 'slides']).toJS()).to.deep.equal(newSlides)
    expect(nextState.getIn([newRef, 'graph']).toJS()).to.deep.equal(newGraph)
    expect(nextState.getIn([newRef, 'currentSlideRef'])).to.equal(graph.startPoints[0])
  })

  it('should override a module when it is already present, and reset the currentSlideRef', () => {
    const newSlides = [{
      a: 5,
      b: 6
    }, {
      a: 7,
      b: 8
    }]
    state = state.setIn([moduleRef, 'currentSlideRef'], 5)

    const nextState = reducer(state, questionModuleLoad(moduleRef, newSlides, graph))
    expect(nextState.getIn([moduleRef, 'slides']).toJS()).to.not.deep.equal(slides)
    expect(nextState.getIn([moduleRef, 'slides']).toJS()).to.deep.equal(newSlides)
    expect(nextState.getIn([moduleRef, 'graph']).toJS()).to.deep.equal(graph)
    expect(nextState.getIn([moduleRef, 'currentSlideRef'])).to.equal(graph.startPoints[0])
  })
})
