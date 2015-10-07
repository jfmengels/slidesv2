import { QUESTION_MODULE_LOAD } from '../constants'

export default (ref, slides) => {
  return {
    ref,
    slides,
    type: QUESTION_MODULE_LOAD
  }
}
