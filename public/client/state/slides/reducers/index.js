import { createReducer } from '../../utils'
import validateAnswer from './validateAnswer'
import questionModuleLoad from './questionModuleLoad'
import { QUESTION_MODULE_LOAD, VALIDATE_ANSWER } from '../constants'

const initialState = {}

export default createReducer(initialState, {
  [QUESTION_MODULE_LOAD]: questionModuleLoad,
  [VALIDATE_ANSWER]: validateAnswer
})
