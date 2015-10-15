import React from 'react'
import axios from 'axios'

import createStore from '../../../store'
import { questionModuleLoad, validateAnswer } from '../../../reducers/slides/actions'
import Debug from '../../components/Debug'
import Slide from '../components/slide'
import EndSlide from '../components/endSlide'
import Loading from '../components/loading'

const store = createStore()

export default class SlidesModules extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentDidMount () {
    const { ref } = this.props.params
    axios.all([
      axios.get(`/api/slides/${ref}`),
      axios.get(`/api/graphs/${ref}`)
    ])
    .then(axios.spread(({ data: slides }, { data: graphs }) => {
      const slidesMap = slides.reduce((map, slide) => {
        map[slide.ref] = slide
        return map
      }, {})
      store.dispatch(questionModuleLoad(ref, slidesMap, graphs))
    }))
  }

  onSendAnswer (answer) {
    const { ref } = this.props.params
    store.dispatch(validateAnswer(ref, answer))
  }

  render () {
    const { ref } = this.props.params
    const debug = <Debug store={store} />
    const currentModule = store.getState().getIn(['slides', ref])
    if (!currentModule) {
      return <div><Loading />{debug}</div>
    }

    const slideRef = currentModule.get('currentSlideRef')
    const endPoint = currentModule.getIn(['graph', 'endPoints', slideRef])

    let slide
    if (endPoint) {
      slide = <EndSlide data={endPoint.toJS()} />
    } else {
      const currentSlide = currentModule.getIn(['slides', slideRef])
      slide = <Slide moduleRef={ref} data={currentSlide} onSendAnswer={this.onSendAnswer.bind(this)} />
    }
    return (
      <div>
        {slide}
        {debug}
      </div>
    )
  }
}
