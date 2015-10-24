import { compose, createStore, applyMiddleware } from 'redux'
import { devTools } from 'redux-devtools'
import thunk from 'redux-thunk'

import { reducers } from './state'

const middleware = [
  applyMiddleware(thunk),
  devTools()
]

const finalCreateStore = compose(...middleware)(createStore)

export default (initialState) => {
  const store = reducers(initialState)
  return finalCreateStore(reducers, store)
}
