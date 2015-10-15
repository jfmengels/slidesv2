import { QUESTION_MODULE_LOAD } from '../constants'

export default (moduleRef, slides, graph) => {
  return {
    moduleRef,
    slides,
    graph,
    type: QUESTION_MODULE_LOAD
  }
}
