import { LOAD_MODULE_LIST } from '../constants'

export default (moduleList) => {
  return {
    moduleList,
    type: LOAD_MODULE_LIST
  }
}
