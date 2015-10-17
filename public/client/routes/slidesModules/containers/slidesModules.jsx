import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { questionModuleLoad, validateAnswer } from '../../../reducers/slides/actions'
import Slide from '../components/slide'
import EndSlide from '../components/endSlide'
import Loading from '../components/loading'

function mapStateToProps (state) {
  return {
    slides: state.get('slides')
  }
}

const mapDispatchToProps = {
  questionModuleLoad,
  validateAnswer
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SlidesModules extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    slides: PropTypes.object.isRequired,
    questionModuleLoad: PropTypes.func.isRequired,
    validateAnswer: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.slides.get('graph')) {
      return
    }
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
      this.props.questionModuleLoad(ref, slidesMap, graphs)
    }))
  }

  onSendAnswer (answer) {
    const { ref } = this.props.params
    this.props.validateAnswer(ref, answer)
  }

  render () {
    const { slides } = this.props
    const { ref } = this.props.params
    const currentModule = slides.get(ref)
    if (!currentModule) {
      return <Loading />
    }

    const slideRef = currentModule.get('currentSlideRef')
    const endPoint = currentModule.getIn(['graph', 'endPoints', slideRef])

    if (endPoint) {
      return <EndSlide data={endPoint.toJS()} />
    }

    const currentSlide = currentModule.getIn(['slides', slideRef])
    return <Slide moduleRef={ref} data={currentSlide} onSendAnswer={this.onSendAnswer.bind(this)} />
  }
}
