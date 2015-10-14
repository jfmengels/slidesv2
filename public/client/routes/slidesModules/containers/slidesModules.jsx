import React from 'react'
import axios from 'axios'

import createStore from '../../../store'
import { questionModuleLoad, validateAnswer } from '../../../modules/slides/actions'
import Debug from '../../app/components/Debug'
import Slide from '../components/slide'
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
    store.dispatch(validateAnswer(this.props.params.ref, answer))
  }

  render () {
    const debug = <Debug store={store} />
    const currentModule = store.getState().getIn(['slides', 'modules', this.props.params.ref])
    if (!currentModule) {
      return <div><Loading />{debug}</div>
    }

    const currentSlide = currentModule.getIn(['slides', currentModule.get('currentSlideRef')])
    return (
    <div>
      <Slide
        moduleRef={this.props.params.ref}
        data={currentSlide}
        onSendAnswer={this.onSendAnswer.bind(this)}
      />
      {debug}
    </div>
    )
  }
}
