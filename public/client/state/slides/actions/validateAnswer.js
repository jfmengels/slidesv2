import { VALIDATE_ANSWER } from '../constants'

export default (moduleRef, answer) => {
  return {
    moduleRef,
    answer,
    type: VALIDATE_ANSWER
  }
}
