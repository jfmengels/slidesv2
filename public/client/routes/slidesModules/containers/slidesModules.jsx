import React from 'react'

import createStore from '../../../store'
import { questionModuleLoad } from '../../../modules/slides/actions'
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
    if (!store.getState().getIn(['slides', 'modules', this.props.params.ref])) {
      var slidesMap = slidesData.reduce((map, slide) => {
        map[slide.ref] = slide
        return map
      }, {})
      store.dispatch(questionModuleLoad('9.A', slidesMap, graphData))
    }
  }

  onSendAnswer (answer) {
    console.log(answer)
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
        onSendAnswer={this.onSendAnswer}
      />
      {debug}
    </div>
    )
  }
}

const slidesData = [{
  'ref': '9.A.1',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Combien fait 1 + 3 ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.1.0',
        'value': '4',
        'label': '4'
      }, {
        'ref': '9.A.1.1',
        'value': '3',
        'label': '3'
      }, {
        'ref': '9.A.1.2',
        'value': '5',
        'label': '5'
      }, {
        'ref': '9.A.1.3',
        'value': '13',
        'label': '13'
      }]
    }
  }
}, {
  'ref': '9.A.2',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Combien fait 0 * 99 ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.2.0',
        'value': '-0',
        'label': '-0'
      }, {
        'ref': '9.A.2.1',
        'value': '+0',
        'label': '+0'
      }, {
        'ref': '9.A.2.2',
        'value': '99',
        'label': '99'
      }, {
        'ref': '9.A.2.3',
        'value': '990',
        'label': '990'
      }]
    }
  }
}, {
  'ref': '9.A.3',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Un mammiphère est à un caniche ce qu\'un insecte est à un(e) ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.3.0',
        'value': 'cheval',
        'label': 'cheval'
      }, {
        'ref': '9.A.3.1',
        'value': 'alien',
        'label': 'alien'
      }, {
        'ref': '9.A.3.2',
        'value': 'araigné',
        'label': 'araigné'
      }, {
        'ref': '9.A.3.3',
        'value': 'mille-pattes',
        'label': 'mille-pattes'
      }]
    }
  }
}, {
  'ref': '9.A.4',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Qui a volé l\'orange du marchand ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.4.0',
        'value': 'Les politiciens',
        'label': 'Les politiciens'
      }, {
        'ref': '9.A.4.1',
        'value': 'Le marchand',
        'label': 'Le marchand'
      }, {
        'ref': '9.A.4.2',
        'value': 'Jean',
        'label': 'Jean'
      }, {
        'ref': '9.A.4.3',
        'value': 'Radjiv',
        'label': 'Radjiv'
      }]
    }
  }
}, {
  'ref': '9.A.5',
  'chapter_ref': '9.A',
  'question': {
    'header': '1, 2, 3, ..., 5 ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.5.0',
        'value': '5',
        'label': '5'
      }, {
        'ref': '9.A.5.1',
        'value': '2^2',
        'label': '2^2'
      }, {
        'ref': '9.A.5.2',
        'value': '42',
        'label': '42'
      }, {
        'ref': '9.A.5.3',
        'value': '43',
        'label': '43'
      }]
    }
  }
}, {
  'ref': '9.A.6',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Combien fait 16 * 16 ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.6.0',
        'value': '256',
        'label': '256'
      }, {
        'ref': '9.A.6.1',
        'value': '2^8',
        'label': '2^8'
      }, {
        'ref': '9.A.6.2',
        'value': '1616',
        'label': '1616'
      }, {
        'ref': '9.A.6.3',
        'value': '356',
        'label': '356'
      }]
    }
  }
}, {
  'ref': '9.A.7',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Combien fait 16 * 16 ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.7.0',
        'value': '256',
        'label': '256'
      }, {
        'ref': '9.A.7.1',
        'value': '2^8',
        'label': '2^8'
      }, {
        'ref': '9.A.7.2',
        'value': '1616',
        'label': '1616'
      }, {
        'ref': '9.A.7.3',
        'value': '356',
        'label': '356'
      }]
    }
  }
}, {
  'ref': '9.A.8',
  'chapter_ref': '9.A',
  'question': {
    'header': 'Combien fait 16 * 16 ?',
    'type': 'qcm',
    'content': {
      'choices': [{
        'ref': '9.A.8.0',
        'value': '256',
        'label': '256'
      }, {
        'ref': '9.A.8.1',
        'value': '2^8',
        'label': '2^8'
      }, {
        'ref': '9.A.8.2',
        'value': '1616',
        'label': '1616'
      }, {
        'ref': '9.A.8.3',
        'value': '356',
        'label': '356'
      }]
    }
  }
}]

const graphData = {
  'ref': '9.A',
  'startPoints': [
    '9.A.1'
  ],
  'endPoints': {
    '9.A.END.1': {
      'type': 'text',
      'content': 'Nope, vous avez tout raté...'
    },
    '9.A.END.2': {
      'type': 'text',
      'content': 'Bravo, vous devez être un développeur !'
    }
  },
  'vertices': {
    '9.A.1': [{
      'destination': '9.A.2',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.1.0']
      ]
    }, {
      'destination': '9.A.3',
      'description': 'Mauvaise réponse',
      'answers': 'default'
    }],
    '9.A.2': [{
      'destination': '9.A.4',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.2.0'],
        ['9.A.2.1']
      ]
    }, {
      'destination': '9.A.5',
      'description': 'Mauvaise réponse',
      'answers': [
        ['9.A.2.2'],
        ['9.A.2.3']
      ]
    }],
    '9.A.3': [{
      'destination': '9.A.4',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.3.3']
      ]
    }, {
      'destination': '9.A.5',
      'description': 'Mauvaise réponse',
      'answers': 'default'
    }],
    '9.A.4': [{
      'destination': '9.A.6',
      'description': 'Tu es méfiant',
      'answers': [
        ['9.A.4.0'],
        ['9.A.4.3']
      ]
    }, {
      'destination': '9.A.7',
      'description': 'Tu es un escroc',
      'answers': [
        ['9.A.4.1']
      ]
    }, {
      'destination': '9.A.8',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.4.2']
      ]
    }],
    '9.A.5': [{
      'destination': '9.A.6',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.5.0'],
        ['9.A.5.3']
      ]
    }, {
      'destination': '9.A.7',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.5.1']
      ]
    }, {
      'destination': '9.A.8',
      'description': 'Très bonne réponse',
      'answers': [
        ['9.A.5.2']
      ]
    }],
    '9.A.6': [{
      'destination': '9.A.END.2',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.6.0'],
        ['9.A.6.1']
      ]
    }, {
      'destination': '9.A.END.1',
      'description': 'Mauvaise réponse',
      'answers': [
        ['9.A.6.2'],
        ['9.A.6.3']
      ]
    }],
    '9.A.7': [{
      'destination': '9.A.END.2',
      'description': 'Bonne réponse',
      'answers': [
        ['9.A.7.0'],
        ['9.A.7.1']
      ]
    }, {
      'destination': '9.A.END.1',
      'description': 'Mauvaise réponse',
      'answers': [
        ['9.A.7.2'],
        ['9.A.7.3']
      ]
    }],
    '9.A.8': [{
      'destination': '9.A.END.2',
      'description': 'Bonne réponse',
      'answers': [
          ['9.A.8.0'],
          ['9.A.8.1']
      ]
    }, {
      'destination': '9.A.END.1',
      'description': 'Mauvaise réponse',
      'answers': [
          ['9.A.8.2'],
          ['9.A.8.3']
      ]
    }]
  }
}
