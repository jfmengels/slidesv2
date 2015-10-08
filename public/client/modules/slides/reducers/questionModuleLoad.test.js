import { expect } from 'chai'

import reducer from './'
import questionModuleLoad from '../actions/questionModuleLoad'

import slides from './slides.test.fixture.json'
import graph from './graph.test.fixture.json'

describe('slides - module loading', () => {
  let state, moduleRef

  beforeEach(() => {
    moduleRef = graph.ref

    state = reducer(undefined, { type: '@@INIT' })
    state = reducer(state, questionModuleLoad(moduleRef, slides, graph))
  })

  it('should add a new module when modules field is empty', () => {
    expect(state.getIn(['modules', moduleRef, 'slides']).toJS()).to.deep.equal(slides)
    expect(state.getIn(['modules', moduleRef, 'graph']).toJS()).to.deep.equal(graph)
    expect(state.getIn(['modules', moduleRef, 'currentSlideRef'])).to.equal(graph.startPoints[0])
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
    state = state.setIn(['modules', moduleRef, 'currentSlideRef'], '9.A.2')

    const nextState = reducer(state, questionModuleLoad(newRef, newSlides, newGraph))
    // Should not affect other modules
    expect(nextState.getIn(['modules', moduleRef, 'slides']).toJS()).to.deep.equal(slides)
    expect(nextState.getIn(['modules', moduleRef, 'graph']).toJS()).to.deep.equal(graph)
    expect(nextState.getIn(['modules', moduleRef, 'currentSlideRef'])).to.equal('9.A.2')

    expect(nextState.getIn(['modules', newRef, 'slides']).toJS()).to.deep.equal(newSlides)
    expect(nextState.getIn(['modules', newRef, 'graph']).toJS()).to.deep.equal(newGraph)
    expect(nextState.getIn(['modules', newRef, 'currentSlideRef'])).to.equal(graph.startPoints[0])
  })

  it('should override a module when it is already present, and reset the currentSlideRef', () => {
    const newSlides = [{
      a: 5,
      b: 6
    }, {
      a: 7,
      b: 8
    }]
    state = state.setIn(['modules', moduleRef, 'currentSlideRef'], 5)

    const nextState = reducer(state, questionModuleLoad(moduleRef, newSlides, graph))
    expect(nextState.getIn(['modules', moduleRef, 'slides']).toJS()).to.not.deep.equal(slides)
    expect(nextState.getIn(['modules', moduleRef, 'slides']).toJS()).to.deep.equal(newSlides)
    expect(nextState.getIn(['modules', moduleRef, 'graph']).toJS()).to.deep.equal(graph)
    expect(nextState.getIn(['modules', moduleRef, 'currentSlideRef'])).to.equal(graph.startPoints[0])
  })
})
