import { expect } from 'chai'

import reducer from './'
import questionModuleLoad from '../actions/questionModuleLoad'

describe('slides - module loading', () => {
  let state, ref, slides

  beforeEach(() => {
    ref = '123.B'
    slides = [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }]
    state = reducer(undefined, { type: '@@INIT' })
    state = reducer(state, questionModuleLoad(ref, slides))
  })

  it('should add a new module when modules field is empty', () => {
    expect(state.getIn(['modules', ref, 'slides']).toJS()).to.deep.equal(slides)
  })

  it('should set currentPosition to 0', () => {
    expect(state.getIn(['modules', ref, 'currentPosition'])).to.equal(0)
  })

  it('should add a new module when module is not yet present, but modules is not empty', () => {
    const newRef = '456.A'
    const newSlides = [{
      a: 5,
      b: 6
    }, {
      a: 7,
      b: 8
    }]
    state = state.setIn(['modules', ref, 'currentPosition'], 5)

    const nextState = reducer(state, questionModuleLoad(newRef, newSlides))
    // Should not affect other refs
    expect(nextState.getIn(['modules', ref, 'slides']).toJS()).to.deep.equal(slides)
    expect(nextState.getIn(['modules', ref, 'currentPosition'])).to.equal(5)
    expect(nextState.getIn(['modules', newRef, 'slides']).toJS()).to.deep.equal(newSlides)
    expect(nextState.getIn(['modules', newRef, 'currentPosition'])).to.equal(0)
  })

  it('should override a module when it is already present, and reset the currentPosition', () => {
    const newSlides = [{
      a: 5,
      b: 6
    }, {
      a: 7,
      b: 8
    }]
    state = state.setIn(['modules', ref, 'currentPosition'], 5)

    const nextState = reducer(state, questionModuleLoad(ref, newSlides))
    expect(nextState.getIn(['modules', ref, 'slides']).toJS()).to.not.deep.equal(slides)
    expect(nextState.getIn(['modules', ref, 'slides']).toJS()).to.deep.equal(newSlides)
    expect(nextState.getIn(['modules', ref, 'currentPosition'])).to.equal(0)
  })
})
