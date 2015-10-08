import React from 'react'

import ValidateButton from './validateButton'
import styles from './slide.css'

export default class Slide extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onSendAnswer: React.PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      selectedIndex: -1
    }
  }

  slidesToListItems (selectedIndex) {
    return (choice, index) => (
      <li key={index}
        onClick={() => this.onSelect(index)}
        className={index === selectedIndex ? styles.selected : ''}
      >
        {choice.get('label')}
      </li>
    )
  }

  onSelect (choiceIndex) {
    this.setState({
      selectedIndex: choiceIndex
    })
  }

  onValidate () {
    const { data, onSendAnswer } = this.props
    const answer = data.getIn(['question', 'content', 'choices', this.state.selectedIndex, 'value'])
    onSendAnswer(answer)
  }

  render () {
    const { data } = this.props
    const { selectedIndex } = this.state
    const choices = data
      .getIn(['question', 'content', 'choices'])
      .map(this.slidesToListItems(selectedIndex))

    return (
      <div>
        Question {data.get('ref')}
        <p>{data.getIn(['question', 'header'])}</p>
        <ul>
          {choices}
        </ul>
        <ValidateButton
          disabled={selectedIndex === -1}
          onValidate={() => this.onValidate()}
        />
      </div>
    )
  }
}
