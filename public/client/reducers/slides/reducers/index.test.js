import { expect } from 'chai'

import reducer from './'

describe('slides - initialization', () => {
  let state

  beforeEach(() => {
    state = reducer(undefined, { type: '@@INIT' })
  })

  it('should have an empty modules empty as the initial state', () => {
    expect(state.toJS()).to.deep.equal({})
  })

  it('should return current state when action type is undefined', () => {
    // Ensures as best as it can that no action in the reducer equals undefined, meaning no type was misspelled
    const nextState = reducer(state, { type: undefined })
    expect(nextState).to.equal(state)
  })
})

